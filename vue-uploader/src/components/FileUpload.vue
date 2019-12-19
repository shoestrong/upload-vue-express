<template>
<div class="file">
  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="fileds">
      <label>Upload File</label>
      <input
        type="file"
        ref="file"
        @change="onSelect"
      />
    </div>
    <div class="filed">
      <button>Submit</button>
    </div>
    <div class="message">
      <h5>{{message}}</h5>
    </div>
  </form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
      message: ''
    }
  },
  methods: {
    onSelect() {
      const allowedTypes = ['image/jepg', 'image/jpg', 'image/png']
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Only images arr required!'
      }
      if (file.size > 500000) {
        this.message = 'Too large, max size allowed is 500KB'
      }
    },
    async onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios.post('/upload', formData)
        this.message = 'Uploaded!!'
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        this.message = 'Something went wrong!'
      }
    }
  }
}
</script>
