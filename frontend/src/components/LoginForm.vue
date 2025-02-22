<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
        <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password"
            required></v-text-field>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be at least 6 characters',
            ],
        };
    },
    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                try {
                    const response = await fetch('http://localhost:8000/login/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();
                    console.log('Login successful:', data);

                    // Print the content of the response body
                    console.log('Response Body:', data);

                    // Save user data in a cookie
                    const userData = JSON.stringify(data.user_data);
                    document.cookie = `user_data=${encodeURIComponent(userData)}; path=/`;
                    
                } catch (error) {
                    console.error('Login failed:', error);
                    // Handle login error here
                }
            }
        },
    },
};
</script>