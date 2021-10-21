import Colors from './colors'
import Opacity from './opacity'

const defaultTheme = {
  screenBackground: Colors.romansDarkGrey,
  tileBackground: Colors.thundora,
  tileLight: Colors.storeCardBackground,
  tileHighlight: Colors.romansLightGrey,
  categoryHighlight: `${Colors.romansRed}${Opacity._70}`,
  groupHighlight: Colors.romansRed,
  attributeHighlight: Colors.romansNavy,
  itemSelected: Colors.white,
  textColorPrimary: Colors.secondarDarkGrey,
  textColorsecondary: Colors.romansDarkGrey,
  statusBar: {
    color: Colors.white,
    background: Colors.thundora,
    separatorColor: Colors.storeCardBackground
  },
  panel: {
    color: Colors.white,
    gradientColors: ['#196BB3', '#196BB3', '#00529C', '#00529C']
  },
  button: {
    color: Colors.white,
    gradientColors: ['#AEAEAE', '#AEAEAE', '#A1A0A0', '#A1A0A0'],
    _1: {
      color: Colors.white,
      gradientColors: ['#FA3239', '#FA3239', '#EC131C', '#EC131C']
    },
    _2: {
      color: Colors.white,
      gradientColors: ['#196BB3', '#196BB3', '#00529C', '#00529C']
    },
    _3: {
      color: Colors.white,
      gradientColors: ['#11BAED', '#11BAED', '#00ACE2', '#00ACE2']
    },
    _4: {
      color: Colors.white,
      gradientColors: ['#FAA153', '#FAA153', '#FB963C', '#FB963C']
    },
    _5: {
      color: Colors.white,
      gradientColors: ['#B5DE64', '#B5DE64', '#9CCA3F', '#9CCA3F']
    }
  }
}

const getTheme = theme => {
  // TODO: Implement get config function
  if(!theme) return defaultTheme
}

export default getTheme()


// FIXME: Remove this file. It's not being used 
