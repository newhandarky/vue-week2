import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user).then((res) => {

                const { token, expired } = res.data;
                // 3 將登入資訊寫入cookie
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                // 4 轉址到產品頁
                location = './index.html';
            }).catch((err) => {
                Swal.fire({
                    title: `${err.response.data.message}`,
                    text: "請確認您的帳號密碼是否正確",
                    icon: "error"
                });
            });
        },
    },
}).mount('#app');