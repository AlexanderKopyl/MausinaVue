import * as fb from 'firebase'
import user from "./user";

class Ad {
  constructor (title, description, ownerId, imgSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.promo = promo
    this.imgSrc = imgSrc
    this.id = id
    this.ownerId = ownerId
  }
}

export default {
  state: {
    ads: [
      {
        title: 'FirstAd',
        description: 'Hello decsription',
        promo: false,
        imgSrc: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
        id: '123'
      },
      {
        title: 'secondAd',
        description: 'Hello decsription',
        promo: true,
        imgSrc: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
        id: '124'
      },
      {
        title: 'thirdAd',
        description: 'Hello decsription',
        promo: true,
        imgSrc: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg',
        id: '125'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {

    async createAd ({commit, getters}, payload) {
      console.log(user)
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(payload.title, payload.description, 'hello', payload.imgSrc, payload.promo)
        const ad = await fb.database().ref('ads').push(newAd)
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }

  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
