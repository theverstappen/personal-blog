const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp();

const dbBlogPosts = admin.database().ref('/blog/posts');
const dbCategory = admin.database().ref('/blog/categories');
//const databaseApp = admin.database().ref('/appointments');

const getPostsFromDatabase = (res) => {
  let posts = [];

  return dbBlogPosts.on('value', (snapshot) => {
    snapshot.forEach((post) => {
      posts.push({
        id: post.key,
        title: post.val().title,
        link: post.val().link,
        category: post.val().category,
        date: post.val().date,
        mainImage: post.val().mainImage
      });
    });
    res.status(200).json(posts);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
};
const getCategoriesFromDatabase = (res) => {
  let categories = [];

  return dbCategory.on('value', (snapshot) => {
    snapshot.forEach((category) => {
      categories.push({
        id: category.key,
        name: category.val().name
      });
    });
    res.status(200).json(categories);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
};

const sendResult = (res) => {
  return dbBlogPosts.on('value', (snapshot) => {
    res.status(200).json('Success');
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
}
exports.addPost = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const title = req.body.title
    const link = req.body.link
    const category = req.body.category
    const content = req.body.content
    const date = req.body.date
    const mainImage = req.body.mainImage

    dbBlogPosts.push({ title, link, content, date, category, mainImage });
    sendResult(res)
  })
})

exports.getPosts = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }
    getPostsFromDatabase(res)
  })
})

exports.getSinglePostByLink = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }
    let result = {};
    const link = req.body.link;

    // Getting post with the requested link
    dbBlogPosts.orderByChild("link").equalTo(`${link}`).once("value", snapshot => {
      snapshot.forEach((post) => {
        result.title = post.val().title
        result.category = post.val().category
        result.content = post.val().content
        result.date = post.val().date
        result.mainImage = post.val().mainImage
      });

      console.log(result)
      res.send(result);
    })
  })
})
exports.getSinglePostByID = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }
    let result = {};
    const id = req.body.id;

    // Getting post with the requested id
    dbBlogPosts.child(id).on("value", snapshot => {
      result.id = snapshot.key
      result.title = snapshot.val().title
      result.link = snapshot.val().link
      result.category = snapshot.val().category
      result.content = snapshot.val().content
      result.date = snapshot.val().date
      result.mainImage = snapshot.val().mainImage

      console.log(result)
      res.send(result);
    })
  })
})

exports.deletePost = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'DELETE') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    const id = req.query.id
    admin.database().ref(`/blog/posts/${id}`).remove()

    sendResult(res);

  })
})

exports.updatePost = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    const id = req.body.id
    admin.database().ref(`/blog/posts/${id}`).update({
      title: req.body.title,
      link: req.body.link,
      category: req.body.category,
      content: req.body.content,
      date: req.body.date,
      mainImage: req.body.mainImage,
    })
    sendResult(res)
  })
})
exports.addCategory = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)
    const name = req.body.name;

    dbCategory.orderByChild("name").equalTo(name).once("value", snapshot => {
      if (snapshot.exists()) {
        res.send('Bu isimde kayıtlı bir kategori mevcut !');
      }
      else {
        dbCategory.push({ name });
        getCategoriesFromDatabase(res)
      }
    })
  })
})

exports.deleteCategory = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'DELETE') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    const id = req.query.id
    admin.database().ref(`/blog/categories/${id}`).remove()
    getCategoriesFromDatabase(res)
  })
})

exports.getCategories = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }
    getCategoriesFromDatabase(res)
  })
})


// const getAppointmentsFromDatabase = (res) => {
//   let appointments = [];

//   return databaseApp.on('value', (snapshot) => {
//     snapshot.forEach((appointment) => {
//       appointments.push({
//         id: appointment.key,
//         date: appointment.val().date,
//         time: appointment.val().time,
//         userID: appointment.val().userID,
//         datetime: appointment.val().datetime,
//         note: appointment.val().note
//       });
//     });
//     res.status(200).json(appointments);
//   }, (error) => {
//     res.status(error.code).json({
//       message: `Something went wrong. ${error.message}`
//     })
//   })
// };





// exports.deleteUserByID = functions.https.onRequest((req, res) => {
//   return cors(req, res, () => {
//     if (req.method !== 'DELETE') {
//       return res.status(401).json({
//         message: 'Not allowed'
//       })
//     }
//     const id = req.query.id
//     admin.database().ref(`/users/${id}`).remove()
//     getUsersFromDatabase(res)
//   })
// })

// exports.updateUser = functions.https.onRequest((req, res) => {
//   return cors(req, res, () => {
//     if (req.method !== 'POST') {
//       return res.status(401).json({
//         message: 'Not allowed'
//       })
//     }
//     const id = req.body.id
//     admin.database().ref(`/users/${id}`).update({ name: req.body.name, phone: req.body.phone, date: req.body.date })
//     getUsersFromDatabase(res)
//   })
// })

// exports.addAppointment = functions.https.onRequest((req, res) => {
//   return cors(req, res, () => {
//     if (req.method !== 'POST') {
//       return res.status(401).json({
//         message: 'Not allowed'
//       })
//     }
//     console.log(req.body)
//     const date = req.body.date
//     const time = req.body.time
//     const userID = req.body.userID
//     const note = req.body.note
//     const datetime = date + time
//     databaseApp.orderByChild("datetime").equalTo(datetime).once("value", snapshot => {
//       if (snapshot.exists()) {
//         res.send('Bu tarihte bir randevu var!');
//       }
//       else {
//         databaseApp.push({ date, time, userID, note, datetime }).then(ress => {
//           appID = ress.getKey();
//           database.child(userID).child("lastAppID_1").once('value', function (snapshot) {
//             if (snapshot.exists()) {
//               oldAppID = snapshot.val();
//               admin.database().ref(`/users/${userID}`)
//                 .update({ lastAppID_1: appID, lastAppID_2: oldAppID })
//             }
//             else {
//               admin.database().ref(`/users/${userID}`)
//                 .update({ lastAppID_1: appID })
//             }
//           });
//         })
//         getAppointmentsFromDatabase(res)
//       }
//     })
//   })
// })

// exports.getAppointments = functions.https.onRequest((req, res) => {
//   return cors(req, res, () => {
//     if (req.method !== 'GET') {
//       return res.status(404).json({
//         message: 'Not allowed'
//       })
//     }
//     getAppointmentsFromDatabase(res)
//   })
// })

// exports.getAppointments = functions.https.onRequest((req, res) => {
//   return cors(req, res, () => {
//     if (req.method !== 'GET') {
//       return res.status(404).json({
//         message: 'Not allowed'
//       })
//     }

//     let appointments = [];

//     // on ve once farkı nedir ?
//     return databaseApp.on("value", snapshot => {
//         snapshot.forEach((appointment) => {

//           var users = admin.database().ref('/users');

//           users.child(`${appointment.val().userID}`).on("value", user => {
//            console.log(user.val().name)
//             appointments.push({
//               id: appointment.key,
//               userID: appointment.val().userID,
//               date: appointment.val().date,
//               time: appointment.val().time,
//               datetime: appointment.val().datetime,
//               name: user.val().name,
//               phone: user.val().phone,
//               note: appointment.val().note
//             });
//           });
//         });
//         res.status(200).json(appointments);
//     })
//   })
// })

// exports.deleteAppointmentByID = functions.https.onRequest((req, res) => {
//     return cors(req, res, () => {
//         if (req.method !== 'DELETE') {
//             return res.status(401).json({
//                 message: 'Not allowed'
//             })
//         }
//         const id = req.query.id
//         admin.database().ref(`/appointments/${id}`).remove()
//         getAppointmentsFromDatabase(res)
//     })
// })

// exports.updateAppointment = functions.https.onRequest((req, res) => {
//     return cors(req, res, () => {
//         if (req.method !== 'POST') {
//             return res.status(401).json({
//                 message: 'Not allowed'
//             })
//         }
//         const id = req.body.id
//         admin.database().ref(`/appointments/${id}`)
//             .update({ note: req.body.note })
//         getAppointmentsFromDatabase(res)
//     })
// })
