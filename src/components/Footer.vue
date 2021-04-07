<template>
   <div class="footer">

      <div class="container">
        <div class="row">
          <div class="col-sm-12 footer__flex-container">

            <div class="footer__links">
              <a class="footer__link" href="#">Usługi</a>
              <a class="footer__link" href="/search">Księgowi</a>
            </div>

            <div class="footer__socials">
              <a href="#" class="footer__social">
                <social-icon class="social-icon" :height="30" :name="'facebook'" />
              </a>

              <a href="#" class="footer__social">
                <social-icon class="social-icon" :height="30" :name="'linkedin'" />
              </a>

              <a href="#" class="footer__social">
                <social-icon class="social-icon" :height="30" :name="'instagram'" />
              </a>
            </div>

          </div>
        </div>
      </div>
      
    </div>
</template>


<script>
  import SocialIcon from './SocialIcon.vue'

  export default {
    name: 'Footer',
    components: {
      SocialIcon
    }
  }// export default
</script>