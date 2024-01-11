import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'newhandarky',
            products: [],
            tempProduct: {},
            newProduct: {},
            canEdit: false
        }
    },
    methods: {
        checkAdmin() {
            axios.post(`${this.apiUrl}/api/user/check`)
                .then((res) => {
                    console.log(res.data);
                    // 6 呼叫取得商品列表的函式
                    this.getData();
                }).catch((err) => {
                    console.log(err.response);
                    Swal.fire({
                        title: "您尚未登入",
                        text: "將帶您到登入頁面",
                    }).then((result) => {
                        location = "./login.html";
                    });
                })
        },
        getData() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then((res) => {
                    console.log(res.data);
                    // 7 取得資料後存回products陣列
                    this.products = res.data.products;
                }).catch((err) => {
                    Swal.fire({
                        title: "產品資訊取得失敗",
                        text: `${err.response.data.message}`,
                    }).then((result) => {
                        location = "./login.html";
                    });
                });
        },
        // 10 將點擊到的產品存回 tempProduct
        getProduct(product) {
            this.tempProduct = product;
        },

        // 以下純測試用
        showLog(item) {
            console.log(item);
        },
        editProduct() {
            this.canEdit = !this.canEdit;
        },
        addProduct() {
            this.newProduct = {
                title: "",
                category: "",
                origin_price: 0,
                price: "",
                unit: "",
                description: "",
                content: "",
                is_enabled: 1,
                imageUrl: "",
                imagesUrl: [],
            }
        }
    },
    mounted() {

        // 5 取出儲存的token並加入axios的預設headers裡
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        // 1 先確認是否為登入狀態
        this.checkAdmin();
    }
}).mount('#app');