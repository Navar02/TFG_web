<template>
    <v-form @submit.prevent="register">
        <v-text-field
            label="Alias"
            v-model="form.alias"
            :error-messages="errors.alias"
            @input="clearError('alias')"
            required
        ></v-text-field>
        <v-text-field
            label="Email"
            v-model="form.email"
            :error-messages="errors.email"
            @input="clearError('email')"
            required
            :rules="[emailRule]"
        ></v-text-field>
        <v-text-field
            label="Contraseña"
            type="password"
            v-model="form.password"
            :error-messages="errors.password"
            @input="clearError('password')"
            required
        ></v-text-field>
        <v-text-field
            label="Repetir Contraseña"
            type="password"
            v-model="form.repeatPassword"
            :error-messages="errors.repeatPassword"
            @input="clearError('repeatPassword')"
            required
            :rules="[passwordMatchRule]"
        ></v-text-field>
        <v-select
            label="Pregunta de seguridad"
            v-model="form.security_question_id"
            :items="securityQuestions"
            item-title="question"
            item-value="id"
            :error-messages="errors.security_question_id"
            @update:modelValue="clearError('security_question_id')"
            :menu-props="{ offsetY: true }"
            required
            dense
            class="custom-select mb-4"
        ></v-select>
        <v-text-field
            label="Respuesta"
            v-model="form.answer"
            :error-messages="errors.answer"
            @input="clearError('answer')"
            required
        ></v-text-field>
        <v-btn type="submit" color="primary">Registrarse</v-btn>
    </v-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                alias: '',
                email: '',
                password: '',
                repeatPassword: '',
                security_question_id: null,  // Guardará el ID seleccionado
                answer: ''
            },
            securityQuestions: [],
            errors: {
                alias: '',
                email: '',
                password: '',
                repeatPassword: '',
                security_question_id: '',
                answer: ''
            }
        };
    },
    created() {
        this.fetchSecurityQuestions();
    },
    methods: {
        async fetchSecurityQuestions() {
            try {
                const response = await fetch('http://127.0.0.1:8000/getSecQues/');
                this.securityQuestions = await response.json();
            } catch (error) {
                console.error('Error fetching security questions:', error);
            }
        },
        async register() {
            this.clearAllErrors();
            if (!this.validateForm()) {
                return;
            }
            try {
                const payload = {
                    email: this.form.email,
                    password: this.form.password,
                    security_question_id: this.form.security_question_id,
                    answer: this.form.answer,
                    alias: this.form.alias
                };

                console.log("Enviando payload:", payload); // Debug para ver qué se está enviando

                const response = await fetch('http://127.0.0.1:8000/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Registro exitoso');
                    this.$router.push('/'); // Redirigir a la página de inicio de sesión
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error registrando:', error);
            }
        },
        validateForm() {
            let isValid = true;

            if (!this.form.alias) {
                this.errors.alias = 'Alias es requerido';
                isValid = false;
            }
            if (!this.form.email) {
                this.errors.email = 'Email es requerido';
                isValid = false;
            } else if (!/.+@.+\..+/.test(this.form.email)) {
                this.errors.email = 'Email debe ser válido';
                isValid = false;
            }
            if (!this.form.password) {
                this.errors.password = 'Contraseña es requerida';
                isValid = false;
            }
            if (!this.form.repeatPassword) {
                this.errors.repeatPassword = 'Repetir Contraseña es requerida';
                isValid = false;
            } else if (this.form.password !== this.form.repeatPassword) {
                this.errors.repeatPassword = 'Las contraseñas deben coincidir';
                isValid = false;
            }
            if (!this.form.security_question_id) {
                this.errors.security_question_id = 'Pregunta de seguridad es requerida';
                isValid = false;
            }
            if (!this.form.answer) {
                this.errors.answer = 'Respuesta es requerida';
                isValid = false;
            }

            return isValid;
        },
        clearError(field) {
            this.errors[field] = '';
        },
        clearAllErrors() {
            for (let key in this.errors) {
                this.errors[key] = '';
            }
        }
    },
    computed: {
        emailRule() {
            return v => /.+@.+\..+/.test(v) || 'Email debe ser válido';
        },
        passwordMatchRule() {
            return v => v === this.form.password || 'Las contraseñas deben coincidir';
        }
    }
};
</script>

<style scoped>
/* Espaciado entre el v-select y el siguiente campo */
.mb-4 {
    margin-bottom: 16px !important;
}

/* Botón */
button {
    width: 100%;
    padding: 10px;
    background-color: #1976D2;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #1565C0;
}
</style>