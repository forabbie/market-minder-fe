<template>
  <section class="overflow-hidden" style="background-color: hsl(0, 0%, 96%)">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
          <!-- <p class="text-justify">
            Market Minder app is a user-friendly platform that allows traders to buy and sell
        stocks. You can create an account, search stocks, place orders, monitor your portfolio,
            and track transactions seamlessly. With user-friendly features and access to real-time
            market data, the Stock Trader app empowers you to take control of your investments and
            pursue your financial goals with confidence.
          </p> -->
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div class="card mt-3">
            <div class="card-body px-4 py-5 px-md-5">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>
