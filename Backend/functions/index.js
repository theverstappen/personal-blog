const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.database().ref('/blog');
//const databaseApp = admin.database().ref('/appointments');

const getPostsFromDatabase = (res) => {
  let posts = [];

  return database.on('value', (snapshot) => {
    snapshot.forEach((post) => {
      posts.push({
        id: post.key,
        title: post.val().title,
        link: post.val().link,
        category: post.val().category,
        content: post.val().content,
        date: post.val().date
      });
    });
    res.status(200).json(posts);
  }, (error) => {
    res.status(error.code).json({
      message: `Something went wrong. ${error.message}`
    })
  })
};
exports.addPost = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body)

    const title = req.body.title
    const link = title.replace(/\s+/g, '-').toLowerCase()
    const category = req.body.category
    const content = req.body.content
    const date = req.body.date

    database.push({ title, link, content, date, category });
    getPostsFromDatabase(res)
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

exports.getSinglePost = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(404).json({
        message: 'Not allowed'
      })
    }
    let result = {};
    const link = req.body.link;

    database.orderByChild("link").equalTo(`${link}`).once("value", snapshot => {
      snapshot.forEach((post) => {
        result.title = post.val().title
        result.category = post.val().category
        result.content = post.val().content
        result.date = post.val().date
      });

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
    admin.database().ref(`/blog/${id}`).remove()
    getPostsFromDatabase(res)
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
    admin.database().ref(`/blog/${id}`).update({
      title: req.body.title,
      link: req.body.title.replace(/\s+/g, '-').toLowerCase(),
      category: req.body.category,
      content: req.body.content,
      date: req.body.date
    })
    getPostsFromDatabase(res)
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
