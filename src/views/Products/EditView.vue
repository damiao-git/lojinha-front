<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Edit Product</h4>
      </div>
      <div class="card-body">
        <ul
          class="alert alert-warning"
          v-if="Object.keys(errorList).length > 0"
        >
          <li
            class="mb-0 ms-3"
            v-for="(error, index) in errorList"
            :key="index"
          >
            {{ error[0] }}
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
          <button @click="updateProduct" class="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "productsEdit",
  data() {
    return {
      productId: "",
      errorList: "",
      model: {
        product: {
          nome: "",
          preco: "",
          quantidade: "",
        },
      },
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.productId = this.$route.params.id;
    this.getProductData(this.$route.params.id);
  },
  methods: {
    getProductData(productId) {
      axios
        .get(`http://127.0.0.1:8000/api/produtos/${productId}/edit`)
        .then((res) => {
          console.log(res.data);

          this.model.product = res.data.produto;
          // this.model.product.preco = res.data.preco
          // this.model.product.quantidade = res.data.quantidade
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },

    updateProduct() {
      var myThis = this;
      axios.put(`http://127.0.0.1:8000/api/produtos/${this.productId}/update`, this.model.product)
        .then((res) => {
          console.log(this.productId);
          alert(this.productId);

          this.errorList = "";
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              myThis.errorList = error.response.data.errors;
            }
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  },
};
</script>

<style>
</style>