
const Service = {
    getData(url, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    cache: false,
                    success: (data) => {
                        resolve(data)
                    },
                    error: (xhr, status, err) => {
                        reject(url, status, err.toString())
                    }
                })
            }, delay)
        })
    }
}
module.exports = Service