import express from 'express'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minuts'
import { convertMinutsStringToHour } from './utils/convert-minuts-string-to-hour'

import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors()) // para permitir apenas meus dominios fazer requests passar parametro {origin: "https://dominio.com"}

const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return response.json(games)
})

app.post('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id

    const body: any = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id:true,
            gameId:true,
            name:true,
            yearsPlaying:true,
            weekDays:true,
            hourStart:true,
            hourEnd:true,
            useVoiceChannel:true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            gameId: gameId
        }
    })
    
    return response.json(ads.map((ad): any => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutsStringToHour(ad.hourStart),
            hourEnd: convertMinutsStringToHour(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord
    })
})

app.listen(3333)