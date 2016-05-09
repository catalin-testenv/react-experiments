const Service = {
    getData(url, delay, callback) {
        setTimeout(() => {
            $.ajax({
                url: url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    callback(data)
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(url, status, err.toString())
                }.bind(this)
            })
        }, delay)
        
    }
}
module.exports = Service