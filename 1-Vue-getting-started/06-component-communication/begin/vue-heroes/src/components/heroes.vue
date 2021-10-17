<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <div class="columns">
        <div class="column is-8" v-if="heroes">
          <!-- <heroes-list> -->
          <ul v-if="!selectedHero">
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">
                      {{ hero.firstName }} {{ hero.lastName }}
                    </div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button
                    class="link card-footer-item"
                    @click="selectHero(hero)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <!-- <heroes-list> -->

          <!-- <hero-detail> -->
          <HeroDetail
            v-if="selectedHero"
            :hero="selectedHero"
            @save="saveHero"
            @cancel="cancelHero"
          />

          <!-- </hero-detail> -->

          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import HeroDetail from '@/components/hero-detail';
import { displayDateFormat, ourHeroes, logger } from '../shared';
import { lifecycleHooks } from '../shared'; //y asis in poner el nombre del archivo que pasa si en shared ha 2 archivos que adentro tienen el mimo nombre de clase? cual de los 2 importa?
import { heroWatchers } from '../shared/logging-mixins';

export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
      capeMessage: '',
    };
  },
  components: { HeroDetail },
  mixins: [lifecycleHooks, heroWatchers],
  methods: {
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
    },
    cancelHero() {
      this.selectedHero = undefined;
    },
    saveHero(hero) {
      const index = this.heroes.findIndex(h => h.id === hero.id);
      this.heroes.splice(index, 1, hero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
  },
  filters: {
    shortDate: function(value) {
      return format(value, displayDateFormat);
    },
  },
  computed: {
    fullName() {
      return this.selectedHero
        ? `${this.selectedHero.firstName} ${this.selectedHero.lastName}`
        : '';
    },
  },
  created() {
    this.loadHeroes();
      logger.info(`${this.componentName} created a hook called `); //ese componentName es el que viene del computed del mixin
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(
          `CapeCounter watcher evalauted. old=${oldValue}, new=${newValue}`,
        );
        this.handleTheCapes(newValue);
      },
    },
  },
};
</script>
