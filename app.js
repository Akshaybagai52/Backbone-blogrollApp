//Backbone Model

var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
})


//Backbone Collection

var Blogs = Backbone.Collection.extend({})

//instantiate two Blogs

// var blog1 = new Blog({
//     author: "Michael",
//     title: "Michael\'s Blog",
//     url: "http://johnsblog.com" 
// })

// var blog2 = new Blog({
//     author: 'John',
//     title: 'John\'s Blog',
//     url: 'http://johnsblog.com'
// })

// instantiate a Collection

// console.log(blogs)

// Backbone View for one blog
var blogs = new Blogs()
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() 
    {
        this.template = _.template($('.blogs-list-template').html())
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel-blog': 'cancel',
        'click .delete-blog': 'delete'
    },
    edit: function() {
        $('.edit-blog').hide()
        $('.delete-blog').hide()
        this.$('.update-blog').show()
        this.$('.cancel-blog').show()

        var author = this.$('.author').html()
        var title = this.$('.title').html()
        var url = this.$('.url').html()

        this.$('.author').html('<input type="text" class="form-control author-update" value=" '+ author + '">')
        this.$('.title').html('<input type="text" class="form-control title-update" value=" '+ author + '">')
        this.$('.url').html('<input type="text" class="form-control url-update" value=" '+ author + '">')
    },
    update: function() {
        this.model.set('author', $('.author-update').val())
        this.model.set('title', $('.title-update').val())
        this.model.set('url', $('.url-update').val())

        // $('.update-blog').hide()
        // $('.cancel-blog').hide()
        // $('.edit-blog').show()
        // $('.delete-blog').show()

    },
    cancel:function() {
        blogsView.render()
    },
    delete:function() {
        this.model.destroy()
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()))
        return this
    }
})


// Backbone View for All blog

// var BlogView = Backbone.View.extend({
//     model: new Blog(),
//     tagName: 'tr',
//     initialize: function() {
//         this.template = _.template($('.blogs-list-template').html())
//     },

//     render: function() {this.$el.html(this.template({model: this.model.toJSON()}))
//     }
// })

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        var self = this
        this.model.on('add', this.render,this)
        this.model.on('change', function() {
            setTimeout(function() {
                self.render()
            })
        }, this)
        this.model.on('remove', this.render, this)
    },
    render: function() {
        var self = this
        this.$el.html('')
        _.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({model:blog})).render().$el)
            return this
        })
        return this
    }
})

var blogsView = new BlogsView

$(document).ready(function() {
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        })
        $('.author-input').val('')
        $('.title-input').val('')
        $('.url-input').val('')
        console.log(blog)
        blogs.add(blog)
    })
})