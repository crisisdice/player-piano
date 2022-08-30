import { emitKeypressEvents } from 'readline'
import Audic from 'audic'


const THRESHOLD = 50

async function main() {
  const player = new Audic('./test.mp3')
  let timeSinceLastPress = 0
  let lastpressed: string = ''

  emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (_, key) => {
    if (key.ctrl && key.name === 'c') {
      player.destroy()
      return process.exit()
    }

    if (key.name === lastpressed) return

    lastpressed = key.name
    timeSinceLastPress = 0
    if (!player.playing) {
      player.play()
    }
  })

  setInterval(() => {
    timeSinceLastPress += 10
    if (timeSinceLastPress > THRESHOLD) {
      player.pause()
    }
  }, 75)
}

main()
