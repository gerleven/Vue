<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      
      
    </div>
    <div class="columns">
      <div class="column is-8">
        <div class="card edit-detail">
          <header class="card-header">
            <p class="card-header-title" v-text="selectedHero.firstName">En vez de la interpolacion con {{selectedHero.firstName}} se puede usar v-text y esto sera ignorado</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>{{selectedHero.id}}</label>
              </div>
              <div class="field">
                <label class="label" for="firstName">first name</label>
                <input class="input" id="firstName" v-model="selectedHero.firstName"/>
              </div>
              <div class="field">
                <label class="label" for="lastName">last name</label>
                <input class="input" id="lastName" v-model="selectedHero.lastName"/>
              </div>
              <div class="field">
                <label class="label" for="description">description</label>
                <textarea class="input" id="description" type="text" v-model="selectedHero.description"/>
              </div>

              <!-- RADIO BUTTONS-->
              <!-- el radio group no es una property del tag, los grupos se determinan automaticamente segu a que variable estan bindeados los diferentes rb con v-model-->
              <!--"1er radio goup: capeColor-->
              <div class="field">
                <label class="label">cape color</label>
                <label class="radio" for="color-red">
                  <input type="radio" id="color-red" value="red" v-model="selectedHero.capeColor"/>
                  red
                </label>
                <label class="radio" for="color-blue">
                  <input
                    type="radio"
                    id="color-blue"
                    value="blue"
                    v-model="selectedHero.capeColor"
                  />
                  blue
                </label>
                <label class="radio" for="color-green">
                  <input type="radio" id="color-green" value="green" v-model="selectedHero.capeColor"/>
                  green
                </label>

                <!--Como bindear la property style de un elemento a una clase que sea dinamica segun cambie una variable: -->
                <div class="color-line" v-bind:style="{'background-color': selectedHero.capeColor}"></div> <!--Aca la property style cambiara cada vez que capeColor lo haga-->
                <div class="color-line" :style="{'background-color': selectedHero.capeColor}"></div>
                <div class="color-line" style="background-color: #FF5511"></div> <!--Aca no hay bindeo, es una asignacion directa de la property style-->
                
                <!--"2do radio goup: headColor-->
                <label class="radio" for="color-silver">
                  <input type="radio" id="color-silver" value="silver" v-model="selectedHero.headColor"/>
                  silver
                </label>
                
                <label class="radio" for="color-pink">
                  <input type="radio" id="color-pink" value="pink" v-model="selectedHero.headColor"/> <!--aca el radio group pasa a ser selectedHero.headCOlor-->
                  pink
                </label>

                <div class="color-line" v-bind:style="{'background-color': selectedHero.headColor}"></div>
                
              </div>

              <!-- Select (DropDown)-->
              <div class="field">
                <label for="power">
                  super power
                  <div class="select is-primary">
                    <select id="power" v-model="selectedHero.power" @keyup.esc="clearPower" :class="{invalid: selectedHero.power===''}">
                      <option disabled value>Please select one</option>
                      <option>Speed</option>
                      <option>Flight</option>
                      <option>Strength</option>
                      <option>Invisibility</option>
                    </select>
                  </div>
                </label>
              </div>
              <div class="field">
                <label class="checkbox" for="active">
                  active
                  <input type="checkbox" class="is-primary" id="active" v-model="selectedHero.active"/>
                </label>
                <br>
                <!--Como bindear la property class de un elemento a una clase que cambie dinamicamente segun cambie una variable (selectedHero.active en este caso): -->
                <p :class="{checkedGreen: selectedHero.active, checkedRed: !selectedHero.active, checkedBold: selectedHero.active, fontSize20px: true}">testeando class binding saegun el checkbox</p>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button class="link card-footer-item cancel-button" v-on:click="cancelselectedHero"> <!--long syntax to handle events-->
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveselectedHero"> <!--short syntax to handle events-->
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer> 
        </div>
        <div class="notification is-info"><pre>{{mesagge}}</pre></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Heroes',
  data() {
    return {
      selectedHero: {
        id: 20,
        firstName: 'Purulaio',
        lastName: 'Rwakanilloss',
        description: 'ring telephon sound while flying',
        capeColor: '',
        headColor: '',
        power: '',
        active: true,

      },
      heroes: [
        {
          id: 10,
          firstName: 'Ella',
          lastName: 'Papa',
          description: 'fashionista',
        },
        {
          id: 20,
          firstName: 'Madelyn',
          lastName: 'Papa',
          description: 'the cat whisperer',
        },
        {
          id: 30,
          firstName: 'Haley',
          lastName: 'Papa',
          description: 'pen wielder',
        },
        {
          id: 40,
          firstName: 'Landon',
          lastName: 'Papa',
          description: 'arc trooper',
        },
      ],
      mesagge: 'test'
    }
  },
  methods: {
    cancelHero(){
      this.mesagge="";
    },
    saveHero(){
      this.mesagge=JSON.stringify(this.hero, null, '\n');
    },
    clearPower(){
      this.hero.power="";
    }
  },
};
</script>


<style>
.checkedGreen{
  color: rgb(21, 187, 71);
}

.checkedBold{
  font-weight: bold;
}

.checkedRed{
  color: rgb(187, 21, 21);
}
.fontSize20px{
  font-size: 20px;
}
</style>