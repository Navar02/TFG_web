from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
import os
import base64
import io
import time
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Para entornos sin display

class PDFGenerator:
    def __init__(self):
        base_path = os.path.dirname(os.path.abspath(__file__))
        templates_path = os.path.join(base_path, 'templates')
        self.env = Environment(loader=FileSystemLoader(templates_path))

    def extract_coordinates_from_context(self, context):
        coordinates = []
        for day in context.get('plan_visita', []):
            for place in day.get('lugares', []):
                coords = place.get('coordenadas')
                if coords and 'latitud' in coords and 'longitud' in coords:
                    coordinates.append((coords['latitud'], coords['longitud']))
        return coordinates

    def generate_map_html(self, coordinates, output_path='map.html'):
        # Genera HTML con Leaflet y los puntos
        markers_js = ""
        bounds_js = "["
        for lat, lon in coordinates:
            markers_js += f"L.marker([{lat}, {lon}]).addTo(map);\n"
            bounds_js += f"[{lat}, {lon}],"
        bounds_js = bounds_js.rstrip(",") + "]"

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Mapa</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <style>#map {{ height: 600px; width: 800px; }}</style>
        </head>
        <body>
            <div id="map"></div>
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
            <script>
                var map = L.map('map', {{
                    zoomControl: false  // Deshabilitar los controles de zoom
                }});
                L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
                    maxZoom: 18,
                }}).addTo(map);
                {markers_js}
                var bounds = {bounds_js};
                map.fitBounds(bounds);
            </script>
        </body>
        </html>
        """
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)

    def generate_map_image_base64(self, map_html_path='map.html'):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--window-size=800x600')

        driver = webdriver.Chrome(options=chrome_options)
        driver.get(f'file://{os.path.abspath(map_html_path)}')
        time.sleep(2)
        map_element = driver.find_element("id", "map")
        png = map_element.screenshot_as_png
        driver.quit()

        img = Image.open(io.BytesIO(png))
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

        # Eliminar el archivo HTML del mapa después de usarlo
        if os.path.exists(map_html_path):
            os.remove(map_html_path)

        return f"data:image/png;base64,{encoded}"

    def render_pdf_bytes(self, template_name, context):
        print("Rendering PDF bytes...")
        print("Generating PDF with template:", template_name)
        print("Templates directory for PDF generation:", self.env.loader.searchpath)

        if template_name is None:
            raise ValueError("Template name cannot be None")
        if template_name == "":
            raise ValueError("Template name cannot be empty")
        if template_name == "plan_pdf.html":
            # Extraer coordenadas y generar imagen de mapa
            coordinates = self.extract_coordinates_from_context(context)
            if coordinates:
                self.generate_map_html(coordinates)
                context['map_image'] = self.generate_map_image_base64()
        else:
            graphs = self.generate_graphs_for_pdf(context)
            context['graphs'] = graphs

        print("Context for template:", context)
        template = self.env.get_template(template_name)
        html_content = template.render(context)
        pdf_bytes = HTML(string=html_content).write_pdf()
        print("PDF bytes generated successfully")
        return pdf_bytes
    
    def generate_graphs_for_pdf(self, context):
        import io
        import base64

        def fig_to_base64(fig):
            buf = io.BytesIO()
            fig.savefig(buf, format='png', bbox_inches='tight')
            buf.seek(0)
            img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
            plt.close(fig)
            return f"data:image/png;base64,{img_base64}"

        # 1. Consumo de tokens por días del mes
        days = sorted(context['days_for_month'].keys(), key=lambda x: int(x))
        values = [context['days_for_month'][day] for day in days]
        fig1, ax1 = plt.subplots()
        ax1.plot([int(day) for day in days], values, marker='o', color='dodgerblue')
        ax1.set_title(f"Consumo de tokens por días del mes ({context['month_name']} {context['year']})", fontsize=13)
        ax1.set_xlabel("Día")
        ax1.set_ylabel("Tokens")
        ax1.grid(True)
        graph1 = fig_to_base64(fig1)

        # 2. Consumo de tokens por meses del año
        months = [str(m) for m in range(1, 13)]
        month_names = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        # Asegura que cada mes tenga un valor, aunque sea 0
        months_for_year = {str(k): v for k, v in context['months_for_year'].items()}
        values2 = [months_for_year.get(m, 0) for m in months]
        fig2, ax2 = plt.subplots()
        ax2.plot(month_names, values2, marker='o', color='forestgreen')
        ax2.set_title(f"Consumo de tokens por meses del año ({context['year']})", fontsize=13)
        ax2.set_xlabel("Mes")
        ax2.set_ylabel("Tokens")
        ax2.grid(True)
        ax2.set_xticklabels(month_names, rotation=30, ha='right')
        graph2 = fig_to_base64(fig2)

        # 3. Consumo de tokens últimos 30 días
        days_30 = list(context['days_last_30'].keys())
        values3 = [context['days_last_30'][k] for k in days_30]
        fig3, ax3 = plt.subplots()
        ax3.plot(days_30, values3, marker='o', color='orange')
        ax3.set_title("Consumo de tokens últimos 30 días", fontsize=13)
        ax3.set_xlabel("Día-Mes")
        ax3.set_ylabel("Tokens")
        ax3.grid(True)
        plt.setp(ax3.get_xticklabels(), rotation=45, ha='right')
        graph3 = fig_to_base64(fig3)

        return {
            'graph_days_month': graph1,
            'graph_months_year': graph2,
            'graph_last_30_days': graph3
        }
