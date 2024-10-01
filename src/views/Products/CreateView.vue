<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Add Product</h4>
      </div>
      <div class="card-body">
        <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
            <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                {{error[0]}}
            </li>
        </ul>
        <div class="mb-3">
          <label for="">Nome</label>
          <input
            type="text"
            v-model="model.product.nome"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Preço</label>
          <input
            type="number"
            v-model="model.product.preco"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Quantidade</label>
          <input
            type="number"
            v-model="model.product.quantidade"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button @click="saveProduct" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "productsCreate",
  data() {
    return {
      errorList: '',
      model: {
        product: {
          nome: "",
          preco: "",
          quantidade: "",
        },
      },
    };
  },
  methods: {
    saveProduct() {
      var myThis = this;
      axios
        .post("http://127.0.0.1:8000/api/produtos", this.model.product)
        .then((res) => {
          console.log(res.data);
          alert(res.data);

          this.model.product = {
            nome: "",
            preco: "",
            quantidade: "",
          }
          this.errorList = '';
        })
        .catch(function (error) {
          if (error.response) {

            if (error.response.status == 422) {

              myThis.errorList = error.response.data.errors;
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
};
</script>

<style>
</style>