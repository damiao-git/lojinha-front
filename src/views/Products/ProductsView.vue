<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Product
                    <router-link to="/products/create" class="btn btn-primary float-end">
                        Add Product
                    </router-link>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.products.length > 0">
                        <tr v-for="(product, id) in this.products" :key="id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.nome }}</td>
                            <td>R$ {{ product.preco }}</td>
                            <td>{{ product.quantidade }}</td>
                            <td class="d-flex justify-content-center gap-2">
                                <router-link :to="{path: '/produtos/'+product.id+'/edit'}" class="btn btn-success">
                                    Editar
                                </router-link>
                                <router-link to="/product/destroy" class="btn btn-danger">
                                    Excluir
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'products',
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            axios.get('http://127.0.0.1:8000/api/produtos').then(res => {
                this.products = res.data
                // console.log(this.products);

            })
        }
    },
}
</script>