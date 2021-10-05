<template>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <!--long v-bind:-->
          <a
            v-bind:href="githublink" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github fa-2x" aria-hidden="true"></i>
          </a>
          <!--short v-bind:-->
          <a
            :href="twitterlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-twitter fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBarLinks",
  data() {
    return {
      githublink: "https://github.com/johnpapa/vue-getting-started",
      twitterlink: "https://twitter.com/john_papa"
    }
  },
}
</script>