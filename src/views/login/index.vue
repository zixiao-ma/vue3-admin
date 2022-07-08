<template>
  <main>
    <h2>Vue-Admin-后台管理系统</h2>
    <div class="bg"></div>
    <a-card :style="{paddingTop:btnLogin?'20px':'35px'}">
      <a-form
        :label-col="{ span: 4 }"
        :model="formState"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
        name="basic"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          :rules="[{ required: true, message: '请输入用户名!' }]"
          label="用户名"
          name="username"
        >
          <a-input v-model:value="formState.username"/>
        </a-form-item>

        <a-form-item
          :rules="[{ required: true, message: '请输入密码!' }]"
          label="密    码"
          name="password"
        >
          <a-input-password v-model:value="formState.password"/>
        </a-form-item>
        <a-form-item
          :rules="[{ required: true, message: '请输入验证码!' }]"
          class="code_box"
          label="验证码"
          name="code"
        >
          <a-input v-model:value="formState.code" class="codeImg" style="width: 200px"/>
          <img :src="captchaImg" alt="" @click="debounceSuggest">
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
          <a-button :loading="loading" :style="{opacity:btnLogin?'1':'0'}" block html-type="submit" type="primary"
                    @keydown.enter="onFinish">登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </main>

</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { apiLogin, getCaptcha } from '@/api/login'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const captchaImg = ref('')
const loading = ref(false)
const formState = reactive({
  username: 'test',
  password: '1234567',
  code: null,
  token: null
})
const btnLogin = computed(() => {
  return formState.username && formState.password && formState.code
})

const getCodeUrl = async () => {
  try {
    const res = await getCaptcha()
    console.log(res)
    captchaImg.value = res.captchaImg
    formState.token = res.token
    formState.code = ''
  } catch (error) {
    console.log(error)
  }
}
getCodeUrl()
const onFinish = async () => {
  try {
    loading.value = true
    console.log(formState)
    const res = await apiLogin(formState)
    if (res === undefined) {
      getCodeUrl()
    } else {
      await router.push('/')
      message.success('登录成功！')
    }
  } catch (error) {

  }
  loading.value = false
}

const debounce = (func, delay = 200) => {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}
const debounceSuggest = debounce(getCodeUrl, 500)
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
</script>
<style lang="scss" scoped>

.ant-card {
  border-top: 5px solid #409eff;
  box-sizing: border-box;
  width: 425px;
  height: 290px;
  padding-top: 35px;
  position: absolute;
  transition: all .3s;
  top: 19%;
  left: 50%;
  transform: translateX(-50%);
}

h2 {
  position: absolute;
  left: 48%;
  top: 12%;
  transform: translateX(-50%);
}

main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .bg {
    width: 100%;
    height: 250px;
    background-color: #409eff;
    background-image: url("http://www.macrozheng.com/admin/static/img/login_center_bg.5307896.png");
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 22%;
  }
}

img {
  height: 33px;
  vertical-align: middle;
  position: relative;
  top: -2px;
  width: 100px;
  border-radius: 2px;
}

.codeImg {
  margin-right: 10px;
}
</style>
