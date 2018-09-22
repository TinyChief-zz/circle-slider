import init from './init'
import eventHandler from './eventHadler'

// Canvas initiliaze
const canvas = document.querySelector('canvas')
const container = document.getElementsByClassName('container')[0]
const ctx = canvas.getContext('2d')
canvas.width = container.offsetWidth
canvas.height = container.offsetHeight

// This will handle all changes
eventHandler(canvas)

// This will draw initial picture
init(canvas)

// console.log(colorsArray)