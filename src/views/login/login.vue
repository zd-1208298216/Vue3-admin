<template>
  <div class="login-container">
		<div class="login-left">
			<div class="login-left-logo">
        <img :src="logoMini" class="login-left-logo-img"/>
        <div class="login-left-logo-text">
          <span>vueNextAdmin</span>
          <span class="login-left-logo-text-msg">专注、免费、开源、维护、解疑</span>
        </div>
      </div>
      <div class="login-left-img">
        <img :src="loginMain" />
      </div>
      <div class="login-left-border">
        <img :src="loginBg" class="login-left-waves" />
      </div>
		</div>
		<div class="login-right">
			<div class="login-right-warp">
        <span class="login-right-warp-one"></span>
        <span class="login-right-warp-two"></span>
        <div class="login-right-warp-main">
          <span class="login-right-warp-main-title">vue-next-admin 欢迎您！</span>
          <div class="login-right-warp-main-form">
            <div v-if="!state.isScan">
              <el-tabs v-model="state.tabsActiveName" stretch>
								<el-tab-pane label="用户名登录" name="account">
									<Account/>
								</el-tab-pane>
								<el-tab-pane label="手机号登录" name="mobile">
									<Mobile/>
								</el-tab-pane>
							</el-tabs>
            </div>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, computed } from 'vue';
import logoMini from '@/assets/logo-mini.svg';
import loginMain from '@/assets/login-main.svg';
import loginBg from '@/assets/login-bg.svg';

const Account = defineAsyncComponent(() => import('@/views/login/component/account.vue'))
const Mobile = defineAsyncComponent(() => import('@/views/login/component/mobile.vue'))

const state = reactive({
	tabsActiveName: 'account',
	isScan: false,
});

</script>

<style scoped lang="scss">
.login-container {
	height: 100vh;
  width: 100vw;
  display: flex;
	background: var(--el-color-white);
  .login-left{
    flex: 1;
    background-color: rgba(211, 239, 255, 1);
    margin-right: 100px;
    position: relative;
    .login-left-logo{
      display: flex;
      position: absolute;
      top: 50px;
      left: 80px;
      align-items: center;
      z-index: 1;
      .login-left-logo-img{
        width: 52px;
        height: 52px;
      }
      .login-left-logo-text{
        display: flex;
        flex-direction: column;
        span{
          margin-left: 10px;
          font-size: 26px;
          color: #26a59a;
        }
        .login-left-logo-text-msg{
          font-size: 12px;
          color: #32a99e;
        }
      }
    }
    .login-left-img{
      width: 100%;
      height: 52%;
      transform: translate(-50%,-50%);
      position: absolute;
      top: 50%;
      left: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .login-left-border{
      position: absolute;
      top: 0;
      right: -100px;
      height: 100vh;
      overflow:hidden;
    }
  }
  .login-right{
    width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-right-warp{
      width: 500px;
      height: 500px;
      border: 1px solid #79bbff;
      border-radius: 3px;
      background-color: #ffffff;
      overflow: hidden;
      margin: auto;
      position: relative;
      .login-right-warp-one,
			.login-right-warp-two {
				position: absolute;
				display: block;
				width: inherit;
				height: inherit;
				&::before,
				&::after {
					content: '';
					position: absolute;
					z-index: 1;
				}
			}
			.login-right-warp-one {
				&::before {
					filter: hue-rotate(0deg);
					top: 0px;
					left: 0;
					width: 100%;
					height: 3px;
					background: linear-gradient(90deg, transparent, #409eff);
					animation: loginLeft 3s linear infinite;
				}
				&::after {
					filter: hue-rotate(60deg);
					top: -100%;
					right: 0px;
					width: 3px;
					height: 100%;
					background: linear-gradient(180deg, transparent, #409eff);
					animation: loginTop 3s linear infinite;
					animation-delay: 0.7s;
				}
			}
			.login-right-warp-two {
				&::before {
					filter: hue-rotate(120deg);
					bottom: 0px;
					right: -100%;
					width: 100%;
					height: 3px;
					background: linear-gradient(270deg, transparent, #409eff);
					animation: loginRight 3s linear infinite;
					animation-delay: 1.4s;
				}
				&::after {
					filter: hue-rotate(300deg);
					bottom: -100%;
					left: 0px;
					width: 3px;
					height: 100%;
					background: linear-gradient(360deg, transparent, #409eff);
					animation: loginBottom 3s linear infinite;
					animation-delay: 2.1s;
				}
			}
      .login-right-warp-main{
        display: flex;
        flex-direction: column;
        height: 100%;
        .login-right-warp-main-title {
					height: 130px;
					line-height: 130px;
					font-size: 27px;
					text-align: center;
					letter-spacing: 3px;
					animation: logoAnimation 0.3s ease;
					animation-delay: 0.3s;
					color: #303133;
				}
        .login-right-warp-main-form{
          flex: 1;
          padding: 0 50px 50px;
        }
      }
    }
  }
}
@keyframes logoAnimation{
	0% {
		transform: scale(0);
	}

	80% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}
@keyframes loginLeft{
  0% {
    left: -100%;
  }
  50%, 100% {
      left: 100%;
  }
}
@keyframes loginTop{
  0% {
    top: -100%;
  }
  50%, 100% {
      top: 100%;
  }
}
@keyframes loginRight{
  0% {
    right: -100%;
  }
  50%, 100% {
      right: 100%;
  }
}
@keyframes loginBottom{
  0% {
    bottom: -100%;
  }
  50%, 100% {
      bottom: 100%;
  }
}
</style>

