import
/* webpackChunkName: "Vuex" */
/* webpackPreload: true */
Vuex from 'vuex'

import { InfoBoxes } from '@/store/collections/InfoBoxes'
import { News } from '@/store/collections/News'
import { About } from '@/store/collections/About'
import { Hero } from '@/store/singletons/Hero'
import { Arketyper } from '@/store/arkivmeta/Arketyper'
import { Daekningsomraader } from '@/store/arkivmeta/Daekningsomraade'
import { Kortvaerker } from '@/store/arkivmeta/Kortvaerker'
import { Maalestok } from '@/store/arkivmeta/Maalestok'
import { Filters } from '@/store/shared/Filters'
import { Kort } from '@/store/arkivmeta/Kort'
import { ImageData } from '@/store/imageServer/ImageData'
import { ArketyperKortvaerker } from '@/store/arkivmeta/ArketyperKortvaerker'
import { FeedbackSubmit } from '@/store/forms/FeedbackSubmit'
import { KnownIssues } from '@/store/singletons/KnownIssues'

export default Vuex.createStore({
  modules: {
    InfoBoxes,
    News,
    About,
    Hero,
    Arketyper,
    Daekningsomraader,
    Kortvaerker,
    Maalestok,
    Filters,
    Kort,
    ImageData,
    ArketyperKortvaerker,
    FeedbackSubmit,
    KnownIssues
  }
})
