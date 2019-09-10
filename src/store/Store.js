import {observable, action} from 'mobx';
import axios from 'axios';

class PokemonStore {
    // Конструктор с асинхронной функцией получения всех типов, всех покемонов и 20 начальный покемонов
    constructor()
    {
        this.GenerateData();
    }

    // Поля для карточки конкретного покемона
    @observable pokemon;
    @observable pokemonSpecies;

     // Поля покемонов
    @observable allPokemons ; // Массив имен всех покемонов по которым можно делать запросы
    @observable pokemonsSearch = []; // Массив покемонов при поиске
    @observable pokemons = [] // Массив отбражаемых покемонов
    
    // Поля чекнутых чекбоксов и статуса запроса конкретного покемона 
    @observable checkMap = new Map(); // Массив чеков для отображения checked при обновление компонента 
    @observable status; // Статус запроса к конкретному покемону для отображения кода ошибка
    
    // Массивы для поисков
    @observable typseArr = []; // Массив типов и покемонов
    @observable searchText = ''; // Текст с формы поиска

    // Пагинация
    @observable currentPage = 1 ; // Текущая страница
    @observable pokemonsPerPage = 20; // К-л покемонов на страницу
   
    @observable types; // Массив всех типов и их запросов для рендера Чекбоксво Надо бы в компонент перенести (из-за прелоадера слетают свг чекедов что бесит ((( )
    @observable fade = false; // Анимация затухания
    @observable fadeStart = false; // Лоадер страницы
   
    // Смена количества покемонов на страницу пагинации
    @action PokemonsOnPage = async (value = 20) =>
    {
        this.fadeStart = this.fade = false;
        this.typseArr = this.pokemons = this.pokemonsSearch = [];
        this.pokemonsPerPage = value;
        this.currentPage = 1;
        this.searchText = '';

        this.types.forEach( (item) => {
            this.checkMap[item.name] =  false;
        });

        let arr = [];
        let request = this.allPokemons.slice(0,  value);
        
        for (const value of request) {
           let requ = await axios.get('https://pokeapi.co/api/v2/pokemon/' + value);
           arr.push({
               name: requ.data.name,
               id: requ.data.id,
               types: requ.data.types,
               sprites: {
                   front_default: requ.data.sprites.front_default
               }
           });
       }
       this.pokemons = arr;
       setTimeout( 
       this.fadeStart = this.fade = true , 500);
    }

    // Переход на другую страницу пагинации
    @action changePage =  async (pageNumber = 1) =>
    {
        this.fadeStart = this.fade = false;
        this.currentPage = pageNumber ;

        let arr = [];
        let request;
        
        if( this.searchText.length === 0 && this.typseArr.length === 0)
        {
        request = this.allPokemons.slice(this.pokemonsPerPage * (this.currentPage - 1 ), this.currentPage * this.pokemonsPerPage)
        }
        else
        {
        request = this.pokemonsSearch.slice(this.pokemonsPerPage * (this.currentPage - 1 ), this.currentPage * this.pokemonsPerPage)    
        }

        if(request.toString() === this.pokemons.map(item => item.name).toString() )
        {
            setTimeout( async () => {
                this.fadeStart = this.fade = true ;
            }, 1000);        
        }
        else
        {
            this.pokemons = [];
        for (const value of request) {
            let requ = await axios.get('https://pokeapi.co/api/v2/pokemon/' + value);
            arr.push({
                name: requ.data.name,
                id: requ.data.id,
                types: requ.data.types,
                sprites: {
                front_default: requ.data.sprites.front_default
                }
            });
        }
        this.pokemons = arr;
        setTimeout( async () => {
            this.fadeStart = this.fade = true ;
        }, 1000);
    }
    }

    /*
            let arBef = this.pokemons.map( (item) => item.name);
        
        console.log(arBef);
        console.log([...new Set([].concat(arBef , request))]);
        // Зачем лишние вызовы когда можно взять и проверить отличия в массивах (timeoute нужен для условного рендера и для перерендера чекбоксов (иначе будет баг с постоянным отображением пока не поменяются покемоны)) 
        if([...new Set([].concat(arBef , request))].length === arBef.length )
        {
            setTimeout( () => {
            this.fadeStart = this.fade = true
             } , 1000);
             return ;
        }
    */
    // Взаимодействие с чекбоксами ( чекед , анчекед и взаимодействие с массивом типов и их покемонов)
    @action checkBoxSearch = async (event) => 
    {
        this.fadeStart = this.fade = false;
        let name = event.target.value;

        if (event.target.checked) {
            let request  =  await axios.get('https://pokeapi.co/api/v2/type/' + event.target.value);
            this.typseArr.push({
                name: request.data.name,
                pokemon: request.data.pokemon
            });
            this.checkMap[name] = true;
          } else {
                this.typseArr = this.typseArr.filter( (item) => {
                    if(item.name !== event.target.value)
                    {
                        return true;
                    }
                    return false;
                });
                this.checkMap[name] = false;
            };
            
          this.Filter();
        }
    
    // Фильтрация покемонов (по чекбоксам и поисковой форме)
    @action Filter = async () =>{

        this.fadeStart = this.fade = false;
       
        if( (this.typseArr.length === 0 && this.searchText.length >= 0))
        {
            this.pokemonsSearch = this.allPokemons.filter( (item) => item.match( this.searchText + '.*'))
        }
        else if(this.typseArr.length > 0 )
        {
            let masOfRequests = [];
            this.typseArr.map( (item) => {
               masOfRequests = masOfRequests.concat( item.pokemon.map( (item) => item.pokemon ));
              return; 
            });
            masOfRequests = masOfRequests.map( (item) => {
                  return item.name;
            });
            this.pokemonsSearch = [...new Set(masOfRequests)];
            this.pokemonsSearch = this.pokemonsSearch.filter( (item) => item.match( this.searchText + '.*'));
        }
        


            this.changePage();
    }

    // Запросы для выбраного покемона
    @action CurrentPokemon = async (value) =>
    {
        let request;
        try
        {
        request = await axios.get('https://pokeapi.co/api/v2/pokemon/' + value);
        this.pokemon = request.data;
        }
        catch (e)
        {
            this.status = e.response.status;
        }

        try
        {
        request = await axios.get(this.pokemon.species.url);
        this.pokemonSpecies = request.data;
        }
        catch (ee)
        {
            this.pokemonSpecies = "Error";
        }
    }

    // Асинхронка для получения необходимых данных в конструкторе
    GenerateData = async () => {
            let arr = [];
            let request;

            request = await axios.get('https://pokeapi.co/api/v2/type');
            this.types = request.data.results;

            this.types.forEach( (item) => {

                this.checkMap.set(item.name , false);
            })
         

            request = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
            this.allPokemonsCount = request.data.count;

            for (const value of request.data.results) {
                let requ = await axios.get(value.url);
                arr.push({
                    name: requ.data.name,
                    id: requ.data.id,
                    types: requ.data.types,
                    sprites: {
                        front_default: requ.data.sprites.front_default
                    }
                });

            }
        this.pokemons = arr;

        request =  await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + this.allPokemonsCount);
        this.allPokemons = request.data.results.map( (item) => {
            return item.name
        });

        this.fadeStart = this.fade = true;   
    }

}

export default new PokemonStore();