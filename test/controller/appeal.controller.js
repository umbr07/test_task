const appealService = require("../service/appeal.service");

class AppealController {
    // Создаёт обращение
    async createAppeal(req, res) {
        const { Topic, Text } = req.body;
        const appeal = await appealService.createAppeal(Topic, Text);
        return res.json(appeal);
    }

    // Берёт обращение в работу, изменяя статус обращения
    async acceptAppeal(req, res) {
        const { Id ,Status } = req.body
        const appeal = await appealService.acceptAppeal(Id, Status)
        return res.json(appeal);
    }

    // Завершает обработку обращения
    async compleateAppeal(req, res) {
        const { Id, Result = null } = req.body;
        const appeal = await appealService.compleateAppeal(Id, Result)
        return res.json(appeal);
    }

    // Отмена обращения
    async cancelAppeal(req, res) {
        const { Id, Result = null } = req.body;
        const appeal = await appealService.cancelAppeal(Id, Result)
        return res.json(appeal);
    }

    // Получить список обращений с возможностью фильтрации по конкретной дате
    async getAppealsByDate(req, res) {
        const { created_date } = req.body;
        const appeal = await appealService.getAppealsByDate(created_date)
        return res.json(appeal);
    }

    // Получить список обращений с возможностью фильтрации по диапазону дат
    async getAppealsByDateRange(req, res) {
        const {created_date, end_date} = req.body;
        const appeal = await appealService.getAppealsByDateRange(created_date, end_date)
        return res.json(appeal)
    }

    // Отменить все обращения, которые находятся в статусе "в работе"
    async cancelAppealInAcept(req, res) {
        const appeal = await appealService.cancelAppealInAcept()
    }
}

module.exports = new AppealController();