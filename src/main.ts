import { emitKeypressEvents } from 'readline'
import Audic from 'audic'

async function main() {
  // setup
  emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  const player = new Audic('./test.mp3')
  await new Promise(_ => setTimeout(_, 1000))
  console.log('start playing')
  // key event handler
  process.stdin.on('keypress', (_, key) => {
    if (key.ctrl && key.name === 'c') {
      player.destroy()
      return process.exit()
    }
    if (key.name === lastpressed) return

    lastpressed = key.name
    timeSinceLastPress = 0

    if (!player.playing) player.play()
  })

  // key variables
  let timeSinceLastPress = 0
  let lastpressed: string = ''

  // event loop
  setInterval(() => {
    timeSinceLastPress += 10
    if (timeSinceLastPress > 50) player.pause()
  }, 75)
}

main()
