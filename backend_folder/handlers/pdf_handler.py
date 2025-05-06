from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os

class PDFGenerator:
    def __init__(self):
        # Obtener la ruta absoluta de la carpeta 'templates' relativa a este archivo
        base_path = os.path.dirname(os.path.abspath(__file__))
        templates_path = os.path.join(base_path, 'templates')
        self.env = Environment(loader=FileSystemLoader(templates_path))

    def render_pdf_bytes(self, template_name, context):
        print("Rendering PDF bytes...")
        print("Generating PDF with template:", template_name)
        print("Context for template:", context)
        print("Templates directory for PDF generation:", self.env.loader.searchpath)
        template = self.env.get_template(template_name)
        print("Template loaded successfully")
        html_content = template.render(context)
        print("HTML content generated successfully")
        pdf_bytes = HTML(string=html_content).write_pdf()
        print("PDF bytes generated successfully")
        return pdf_bytes

