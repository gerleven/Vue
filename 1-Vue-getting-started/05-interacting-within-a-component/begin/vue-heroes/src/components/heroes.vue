<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="card" v-show="heroes.length">
          <header class="card-header">
            <p class="card-header-title">heroes list</p>
          </header>
          <ul class="list is-hoverable">
            <li v-for="hero in heroes" :key="hero.id">
              <a
                class="list-item"
                @click="selectHero(hero)"
                :class="{ 'is-active': selectedHero === hero }"
              >
                <span>{{ hero.firstName }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>

      <div class="column is-4" v-if="selectedHero">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ fullName2 }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>{{
                  selectedHero.id
                }}</label>
              </div>
              <div class="field">
                <label class="label" for="firstName">first name</label>
                <input
                  class="input"
                  id="firstName"
                  v-model="selectedHero.firstName"
                />
              </div>
              <div class="field">
                <label class="label" for="lastName">last name</label>
                <input
                  class="input"
                  id="lastName"
                  v-model="selectedHero.lastName"
                />
              </div>
              <div class="field">
                <label for="fullName" class="label">Full Name:</label>
                <input
                  type="text"
                  class="input"
                  id="fullName"
                  v-model="fullName2"
                />
              </div>
              <div class="field">
                <label class="label" for="description">description</label>
                <input
                  class="input"
                  id="description"
                  v-model="selectedHero.description"
                />
              </div>
              <div class="field">
                <label class="label" for="originDate">origin date</label>
                <input
                  type="date"
                  class="input"
                  id="originDate"
                  v-model="selectedHero.originDate"
                />
                <p class="comment">
                  My origin story began on {{ selectedHero.originDate | shortDate }}
                </p>
              </div>
              <div class="field">
                <label class="label" for="capeCounter">cape counter</label>
                <input
                  class="input"
                  id="capeCounter"
                  type="number"
                  v-model="selectedHero.capeCounter"
                />
              </div>
              <div class="field">
                <label for="capeMessage" class="label">Cape Message</label>
                <label class="input" name="capeMessage">{{
                  capeMessage
                }}</label>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelHero()"
            >
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero()">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
const inputDateFormat = 'YYYY-MM-DD';
const displayDateFormat = 'MMM DD, YYYY';
const ourHeroes = [
  {
    id: 10,
    firstName: 'Ella',
    lastName: 'Papa',
    capeCounter: 1,
    originDate: format(new Date(1988, 7, 2),inputDateFormat),
    description: 'fashionista',
  },
  {
    id: 20,
    firstName: 'Madelyn',
    lastName: 'Papa',
    capeCounter: 3,
    originDate: format(new Date(1985, 7, 27),inputDateFormat),
    description: 'the cat whisperer',
  },
  {
    id: 30,
    firstName: 'Haley',
    lastName: 'Papa',
    capeCounter: 2,
    originDate: format(new Date(1990, 1, 27),inputDateFormat),
    description: 'pen wielder',
  },
  {
    id: 40,
    firstName: 'Landon',
    lastName: 'Papa',
    capeCounter: 0,
    originDate: format(new Date(1993, 2, 3),inputDateFormat),
    description: 'arc trooper',
  },
];
export default {
  //#g1
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
      capeMessage: '',
    };
  },
  computed: {
    fullName() {
      //es una funcion con "(){...}"
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
    fullName2: {
      //es una property con ":{...}"
      get() {
        return (
          this.selectedHero.firstName +
          (this.selectedHero.lastName ? ` ${this.selectedHero.lastName}` : '')
        );
      },
      set(value) {
        let names = value.split(' ');
        this.selectedHero.firstName = names[0];
        this.selectedHero.lastName =
          names.length === 1 ? '' : names[names.length - 1];
      },
    },
  },
  created() {
    this.loadHeroes();
    this.probando();
  },
  methods: {
    probando() {
      setTimeout(() => {
        console.log('listo');
      }, 1500);
    },
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(ourHeroes);
        }, 500);
      });
    },

    async loadHeroes() {
      this.heroes = [];
      this.message = 'Loading Heroes, please wait 1.5 seg...';
      this.heroes = await this.getHeroes();
      this.message = '';
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
    cancelHero() {
      this.selectedHero = undefined;
      this.message = '';
    },
    saveHero() {
      // This only updates when you click the save button
      this.message = JSON.stringify(this.selectedHero, null, '\n ');
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`the watcher handler changue ${oldValue} - ${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
  filters: {
    shortDate: function(value) {
      return format(value,displayDateFormat);
    },
  },
};
</script>
