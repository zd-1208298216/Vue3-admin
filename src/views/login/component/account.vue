<template>
    <el-form size="large" class="login-content-form">
        <el-form-item class="login-animation1">
            <el-input v-model="state.ruleForm.userName" placeholder="请输入用户名" clearable autocomplete="off">
                <template #prefix>
                    <el-icon><User /></el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="login-animation2">
            <el-input 
                v-model="state.ruleForm.password" 
                placeholder="请输入密码" clearable 
                type="password" autocomplete="off" 
                :show-password=true
            >
                <template #prefix>
                    <el-icon><Unlock /></el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="login-animation3">
            <el-col :span="15">
              <el-input
                text
                maxlength="4"
                placeholder="请输入验证码"
                v-model="state.ruleForm.code"
                clearable
                autocomplete="off"
              >
                <template #prefix>
                  <el-icon><EditPen /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="8">
              <div class="code" @click="refreshCode" style="height:40px">
                  <Sidentify :identifyCode="identifyCode"></Sidentify>
              </div>
            </el-col>
        </el-form-item>
        <el-form-item class="login-animation4">
          <el-button type="primary" round class="login-content-button" @click="signIn">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, computed, defineAsyncComponent, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router'
import { NextLoading } from '@/utils/loading';
import { useUserInfos } from '@/stores/userInfos';
import { useRoutesList } from '@/stores/routesList';

// 定义变量
const router = useRouter()
const route = useRoute()
const Sidentify = defineAsyncComponent(() => import('@/views/login/component/Sidentify.vue'))
const storesUserInfos = useUserInfos();
const storeRoutesList = useRoutesList();

let sidentifyMode = ref('') //输入框验证码
let identifyCode = ref('') //图形验证码
let identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz') //验证码出现的数字和字母
const state = reactive({
	isShowPassword: false,
	ruleForm: {
		userName: 'admin',
		password: 'admin',
		code: '',
	},
});

//登录
const signIn = async () =>{
  if((state.ruleForm.userName !== "admin" || state.ruleForm.password !== "admin") && (state.ruleForm.userName !== "ahhh" || state.ruleForm.password !== "ahhh")){
    ElMessage({ type: 'error', message: '输入的用户名或密码错误！' })
    return
  }
  if (!state.ruleForm.code) {
    ElMessage({ type: 'error', message: '验证码不能为空！' })
    return
  }
  if (state.ruleForm.code != identifyCode.value) {
    ElMessage({ type: 'error', message: '验证码错误' })
    state.ruleForm.code = ""
    refreshCode()
    return
  }
  // 存储token值到sessionStorage中
  sessionStorage.setItem('token',Math.random().toString(36).substr(0))
  // 存储用户信息到sessionStorage中
  let userInfo = {
    userName: state.ruleForm.userName,
    photo: "18888888888",
    userTorole: state.ruleForm.userName,
  }
  sessionStorage.setItem('userInfos',JSON.stringify(userInfo))
  storesUserInfos.setUserInfos()
  // 存储并动态添加路由
  storeRoutesList.addRoutesList(router)
  // 登录成功，跳到转首页
	// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
  if(route.query?.redirect){
    router.push({
      path:<string>route.query.redirect,
      query:Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
    })
  }else{
    router.push('/')
  }
  NextLoading.start()
  ElMessage.success(state.ruleForm.userName+' 欢迎回来');
}


onMounted(() => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
})

// 生成随机数
const randomNum = (min:number, max:number) => {
  max = max + 1
  return Math.floor(Math.random() * (max - min) + min)
}
// 随机生成验证码字符串
const makeCode = (o:any, l:number) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)]
  }
}
// 更新验证码
const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}

</script>

<style scoped lang="scss">
.login-content-form{
    margin-top: 20px;
    @for $i from 1 through 4 {
      .login-animation#{$i} {
        opacity: 0;
        animation-name: error-num;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: calc($i/10) + s;
      }
	  }
    .login-content-button{
      width: 100%;
      letter-spacing: 5px;
      font-weight: 300;
      margin-top: 15px;
    }
}

@keyframes error-num {
	0% {
		transform: translateY(60px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}

</style>
