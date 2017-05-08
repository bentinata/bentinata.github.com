'use strict';

if (process.env.LOG)
  var log = console.log
else
  var log = () => {}


function countmap(page, future) {
  const count = page.map((value, index) => {
    return future.reduce((acc, curr) => acc += curr == value ? 1 : 0, 0)
  })

  return count.indexOf(Math.min(...count))
}

function optimalmap(page, future) {
  const count = page.map((value, index) => {
    return future.indexOf(value)
  })

  //const max =  count.indexOf(Math.max(...count))
  //log(`map: ${max} ${count}`)
  return count.indexOf(Math.max(...count))
}

function optimal(seq, start) {
  const mem = [];
  if (start) mem.push(start)

  for (let i = mem.length; i < seq.length; i += 1) {
    if (i === 0 && !mem.length) {
      mem.push([seq[i]])
      continue;
    }

    const current = mem[i - 1].slice()

    if (current.indexOf(seq[i]) === -1) {
      if (current.length < 4) {
        current.push(seq[i])
      } else {
        let index = optimalmap(current, seq.slice(i + 1))
        current[index] = seq[i]
      }
    } else {
    }

    mem.push(current)
  }
  return mem;
}

function print(seq, interval = 200) {
  let i = 1;
  const clock = setInterval(() => {
    const page = seq.shift()
    log(i, page)
    if (!seq.length) clearInterval(clock)
    i += 1;
  }, interval)
}

//log(optimalmap(['a', 'b', 'c', 'd'], Array.from('babcd')))
const opt = optimal(Array.from('cadbebabcd'))
print(opt)
