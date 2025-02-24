const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AppealService{
    // Создаёт обращение
    async createAppeal(Topic, Text){
        const appeal = await prisma.appeal.create({data: 
            {
                topic: Topic,
                text: Text,
            }});
    }

    // Берёт обращение в работу, изменяя статус обращения
    async acceptAppeal( Id, Status) {
        const appeal = await prisma.appeal.update({
            where: { id: Id },
            data:{
                status: Status
            }
        })
    }

    // Завершает обработку обращения
    async compleateAppeal(Id, Result) {
        const appeal = await prisma.appeal.update({
            where: {
                id: Id
            },
             data:{
                result: Result,
                status: "Завершено"
             }})
    }

    // Отмена обращения
    async cancelAppeal(Id, Result) {
        if(Result === null){
            const appeal = await prisma.appeal.update({
                where:{
                    id: Id,
                },
                data:{
                    status: "Отменено"
                }})
        } else{
            const appeal = await prisma.appeal.update({
                where:{
                    id: Id,
                },
                data:{
                    result: Result,
                    status: "Отменено"
                }})
        }
    }

    // Получить список обращений с возможностью фильтрации по конкретной дате
    async getAppealsByDate(created_date) {
        const appeal = await prisma.appeal.findMany({
            where: {
                created_date: new Date(created_date)
            }
        })
        return appeal;
    }

    // Получить список обращений с возможностью фильтрации по диапазону дат
    async getAppealsByDateRange(created_date, end_date) {
        const appeal = await prisma.appeal.findMany({
            where:{
                created_date: {
                    gte: new Date(created_date),
                    lte: new Date(end_date)
                }
            }
        })
        return appeal;
    }

    // Отменить все обращения, которые находятся в статусе "в работе"
    async cancelAppealInAcept(req, res) {
        const appeal = await prisma.appeal.updateMany({
            where:{
                status: "В работе"
            },
            data: {
                status: "Отменено"
            }
        })
    }
}

module.exports = new AppealService();