function HelpDesk (questions, instanceId) {
    this.questions = questions;
    this.helpers = {};
    forceLock = false;
    this.locked = false;
    this.helpData = null;
    this.instanceId = instanceId;
    this.helpCount = 0;
    this.answersList = new Array();

    this.forceLock = function (flag) {
        if (flag == undefined) {
            return forceLock;
        };
        forceLock = flag;
        return forceLock;
    }

    this.lock = function () {
        this.locked = true;
    }

    this.isLocked = function () {
        return (this.locked == true || forceLock == true);
    }

    this.unlock = function () {
        if (forceLock == true) return;
        this.locked = false;
    }

    this.getInstanceId = function () {
        return this.instanceId;
    }

    this.setQuestions = function (questions) {
        this.questions = questions;
    }

    this.getQuestions = function () {
        return this.questions;
    }

    this.setAnswersList = function (currentQuestion) {
        this.answersList = currentQuestion;
        return this;
    }

    this.getAnswersList = function () {
        return this.answersList;
    }

    this.getData = function () {
        return this.helpData;
    }

    this.setHelper = function (name, instance) {
        var helper = {};
        helper.used = false;
        helper.instance = instance;
        this.helpers[name] = helper;
        return this;
    }

    this.use = function (helperName, data, callback) {
        // Lap re helper theo ten
        var helper = this.helpers[helperName];

        if (helper == undefined || helper.used == true) {
            console.log('Tro giup khong ton tai');
            return false;
        } else if (this.helpCount == Object.keys(this.helpers).length) {
            console.log('Qua '+Object.keys(this.helpers).length+' lan cho phep');
            return false;
        } else if (this.isLocked()) {
            console.log('Tro giup dang bi khoa');
            return false;
        }

        // Khoa moi su tro giup
        this.lock();

        // helpData la current question
        this.helpData = data;

        // instance cua helper
        var instance = helper.instance;

        // Danh dau helper da duoc su dung
        helper.used = true;

        // Tang tong so lan su dung tro giup len 1
        this.helpCount++;

        // Su dung tro giup
        var res = instance.help(callback);

        // Neu tong so lan su dung tro giup chua den gioi han thi mo khoa
        // de nguoi dung co the su dung su tro giup tiep theo
        if (this.helpCount < Object.keys(this.helpers).length) {
            this.unlock();
        };
        return res;
    }

    this.usedCount = function () {
        return this.helpCount;
    }
}

// DONE
function Adapter5050 (dashboard) {
    // Doi so khoi tao phai la instance cua HelpDesk
    this.dashboard = dashboard;

    // Dinh nghia method 'help'
    // Method nay duoc HelpDesk goi den
    this.help = function (callback) {
        // Dinh nghia cac tham so can thiet
        var dashboard = this.dashboard,
            lanLamBai = this.dashboard.getInstanceId(),
            questions = this.dashboard.getQuestions(),
            currentQuestion = this.dashboard.getData(),
            answersList = this.dashboard.getAnswersList(),
            key = questions.indexOf(currentQuestion),
            correctAnswer = currentQuestion.correct,
            answersKey = answersList.join('/'),
            uri = '/tg_50_50.php?dap_an_dung='+correctAnswer+'&gd='+lanLamBai+'&answers='+answersKey;

        // Thuc hien truy van den web service
        $utils.get(uri, 'json', function (res) {
            if (parseInt(res.success) != 1) {
                return;
            };
            // Xu ly chung cho su tro giup
            data = res.data;
            dashboard.setAnswersList(data);

            // Xu ly cu the se do 1 callback dam nhiem
            callback(data);
        });
    }
}

// Cac su tro giup khac tuong tu 50/50

// DONE
function AdapterCall (dashboard) {
    this.dashboard = dashboard;

    this.help = function (callback) {
        var lanLamBai = this.dashboard.getInstanceId(),
            questions = this.dashboard.getQuestions(),
            currentQuestion = this.dashboard.getData(),
            correctAnswer = currentQuestion.correct,
            answersList = this.dashboard.getAnswersList(),
            answersKey = answersList.join('/'),
            uri = '/tg_goi_dien_nguoi_than.php?dap_an_dung='+correctAnswer+'&gd='+lanLamBai+'&answers='+answersKey;
        $utils.get(uri, 'json', function (res) {
            if (parseInt(res.success) != 1) {
                return;
            };
            data = res.data;
            callback(data);
        });
    }
}

// DONE
function AdapterAdvisoryInPlace (dashboard) {
    this.dashboard = dashboard;

    this.help = function (callback) {
        var lanLamBai = this.dashboard.getInstanceId(),
            questions = this.dashboard.getQuestions(),
            currentQuestion = this.dashboard.getData(),
            correctAnswer = currentQuestion.correct,
            answersList = this.dashboard.getAnswersList(),
            answersListCode = currentQuestion.listAnswerCode,
            answersKey = answersList.join('/'),
            uri = '/tg_tu_van_tai_cho.php?dap_an_dung='+correctAnswer+'&gd='+lanLamBai+'&answers='+answersKey;
        $utils.get(uri, 'json', function (res) {
            if (parseInt(res.success) != 1) {
                return;
            };
            data = res.data;
            callback(data);
        });
    }
}

function AdapterAskAudience (dashboard) {
    this.dashboard = dashboard;

    this.help = function (callback) {
        var lanLamBai = this.dashboard.getInstanceId(),
            questions = this.dashboard.getQuestions(),
            currentQuestion = this.dashboard.getData(),
            correctAnswer = currentQuestion.correct,
            answersList = this.dashboard.getAnswersList(),
            answersListCode = currentQuestion.listAnswerCode,
            answersKey = answersList.join('/'),
            uri = '/tg_hoi_y_kien_khan_gia.php?dap_an_dung='+correctAnswer+'&gd='+lanLamBai+'&answers='+answersKey;
        $utils.get(uri, 'json', function (res) {
            if (parseInt(res.success) != 1) {
                return;
            };
            data = res.data;
            callback(data);
        });
    }
}