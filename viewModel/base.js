//viewmodel
class baseModel {

    save(data, cb) {
        var ins = new this.model(data)

        if (cb) {
            return ins.save(cb)
        } else {
            return ins.save()
        }
    }

    findOne(params) {
        return this.model.findOne(params)
    }

    find(params, cb) {
        if (cb) {
            return this.model.find(params, cb)
        } else {
            return this.model.find(params)
        }
    }

    remove(params, cb) {
        if (cb) {
            return this.model.remove(params, cb)
        } else {
            return this.model.remove(params)
        }
    }

    update(wherestr, updatestr, cb) {
        if (cb) {
            return this.model.update(wherestr, updatestr, cb)
        } else {
            return this.model.update(wherestr, updatestr)
        }
    }

    resJSON(res, data) {

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        })

        var resData = {
            code: 0,
            data: data
        }

        res.write(JSON.stringify(resData))
        res.end()
    }

    resError(res, msg) {

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        })

        var resData = {
            code: -1,
            message: msg
        }

        res.write(JSON.stringify(resData))
        res.end()
    }

}

export default baseModel;