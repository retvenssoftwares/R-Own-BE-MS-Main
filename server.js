const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./db/conn");

//Mesibo
const notify = require('./routers/Mesibo/mesiboNotificationrouter');
const usercreation = require('./routers/Mesibo/mesiboRouter')
const users = require('./routers/Mesibo/getMesibouserrouter')
const groupusers = require('./routers/Mesibo/getGroupuserrouter')
const creategroup = require('./routers/Mesibo/creategrouprouter')
const member = require('./routers/Mesibo/addmemberGrouprouter')
const chat = require('./routers/Mesibo/chatNotificatiosnrouter')
const call = require('./routers/Mesibo/callingNotifyRouter')
const deletegroup = require('./routers/Mesibo/deleteGrouprouter')
const leavegroup = require('./routers/Mesibo/leaveGrouprouterapi')

//Admin
const admin = require('./routers/Admin/adminrouter');
const postadmin = require('./routers/Admin/adminPostRouter');
const updateadmin = require('./routers/Admin/updateAdminPostRouter');
const getAdminPosts = require('./routers/Admin/getAdminPostsRouter')


//User
const userprofile = require('./routers/User/userProfilerouter');
const getprofile = require('./routers/User/getUserprofilerouter');
const updateprofile = require('./routers/User/updateUserprofilerouter');
const contacts = require('./routers/User/contactrouter');
const getuser = require('./routers/User/getuserbyidrouter');
const save = require('./routers/User/patchsavedpostrouter');
const likepost = require('./routers/User/likedPostrouter');
const getcontact = require('./routers/User/getContactbyuseridrouter');
const getapioffeed = require('./routers/User/getapiofFeedrouter')
const delConn = require('./routers/User/deleteConnRouter')
const allRequests = require('./routers/User/getallRequestsRouter')
const allUserPolls = require('./routers/User/getPollsinProfileRouter');
const getsync = require('./routers/User/syncContactrouter')
const sendRequest = require('./routers/User/sendRequestRouter')
const verifyUser = require('./routers/User/verifyUserRouter')
const getPendingRequest = require('./routers/User/getPendingRequestsRouter')
const profileCount = require('./routers/User/getProfileCountRouter')
const postIds = require('./routers/User/patchPostIdinConnrouter')
const multiple = require('./routers/User/addMultipleuserRecordrouter')
const fetchusername = require('./routers/User/fetchAllusernamerouter')
const fetchProfileStatus = require('./routers/User/fetchUserProfileStatus')
const datarequest = require('./routers/User/deleterequestrouter')
const getNormalUserProfile = require('./routers/User/fetchNormalUser')
const getconnection = require('./routers/User/getAllconnectionlistrouter')
const addresume = require('./routers/User/addresumeOnprofilerouter')
const { update } = require('./models/admin');
const getsaveallid = require('./routers/User/getSaveallidrouter')
const deleteacco = require('./routers/User/deleteAccountrouter')
const checkSynched = require('./routers/User/checkContactsSynched');
const deactivateAcc = require('./routers/User/deactivateAccountRouter')
const shareprofile = require('./routers/User/shareProfileRouter')
const unblock = require('./routers/User/unblockUserRouter')
const blockuserlist = require('./routers/User/fetchBlockUserListRouter')
const updatehotelinfo = require('./routers/User/addHotelinforouter')
const postcount = require('./routers/User/getHotelServicePostCountRouter')
//verification
const uploadDocs = require('./routers/Verification/uploadDocumentRouter');
const getdocument = require('./routers/Verification/getDocumentRouter');
const checkVerification = require('./routers/Verification/checkVerificationRouter')
const rejectApplication = require('./routers/Verification/rejectApplicationRouter')
//deleted user
const deletedata = require('./routers/User/getDeleteduserrouter')

//Saveid
const saveallid = require('./routers/save/saveAllidrouter')
const savepost = require('./routers/save/getSavePostRouter')
const savejob = require('./routers/save/getSaveJobRouter')
const saveevent = require('./routers/save/getSaveEventRouter')
const saveservice = require('./routers/save/getSaveServicesRouter')
const savehotel = require('./routers/save/getSaveHotelRouter')
const savedBlogs = require('./routers/save/getSavedBlogsRouter')

//Community
const addUsergroup =require('./routers/Community/postGroupuserrouter')
const getusergroup = require('./routers/Community/getUsergrouprouter')
const addNewuser = require('./routers/Community/addNewusergrouprouter')
const updategrp = require('./routers/Community/updateGrouprouter')
const Addadmin = require('./routers/Community/pushUseridIntoAdminrouter')
const getgroupbygroupid = require('./routers/Community/getGroupbygroupidrouter')
const getgroupbycreatorid = require('./routers/Community/getGroupbycreatoridrouter')
const fetchgroup = require('./routers/Community/fetchGroupbyUseridRouter')
const fetchcommunity = require('./routers/Community/fetchCommunityListRouter')
const removemember = require('./routers/Community/removeMemberRouter')


//Blog
const postblog = require('./routers/Blog/postBlogrouter')
const getblog = require('./routers/Blog/getBlogrouter')
const likeblog = require('./routers/Blog/likesBlogrouter')
const commentblog = require('./routers/Blog/commentBlogrouter')
const getcommentblog = require('./routers/Blog/getCommentblogrouter')
const replaycommentblog = require('./routers/Blog/replyCommentrouter')
const blogcategory = require('./routers/Blog/blogCategoryrouter')
const getblogcategory = require('./routers/Blog/getBlogbyCategoryidrouter')
const getcategory = require('./routers/Blog/getBlogcategoryrouter')
const getblogbyuser = require('./routers/Blog/getBlogbyuseridrouter')
const getlike = require('./routers/Blog/getLikebyblogidrouter')
const getblogbyblogid = require('./routers/Blog/getblogbyBlockidrouter')
const fetchblog = require('./routers/Blog/fetchBlogRouter')
const Fetchblog = require('./routers/Blog/fetchBlogByBlogidRouter')
const updateblogdata = require('./routers/Blog/updateBlogrouter')
const blogCatDel = require('./routers/Blog/blogCategoryDelRouter');

//Event
const eventcategory = require('./routers/Events/eventCategoryrouter')
const geteventcategory = require('./routers/Events/getEventcategoryrouter')
const updateeventcategory = require('./routers/Events/updateEventcategoryrouter')
const postevent = require('./routers/Events/postEventrouter')
const updateevent = require('./routers/Events/updateEventrouter')
const geteventbyuserid = require('./routers/Events/getAlleventbyuseridrouter')
const geteventbyeventid = require('./routers/Events/getEventbyeventidrouter')
const ongoingevent = require('./routers/Events/fetchOngoingenentrouter')
const geteventcategorybyid = require('./routers/Events/getEventbycategoryidrouter')
const allevent = require('./routers/Events/getAlleventsrouter')
const eventWhilePosting = require('./routers/Events/geteventsListwhilePostingRouter');




///company
const company = require('./routers/Company/postCompanyrouter');
const getcompany = require('./routers/Company/getCompanyrouter');
const updateComp = require('./routers/Company/updateCompanyRouter')
const deletecompany = require('./routers/Company/deleteCompanyRouter')
//interest api
const updateinterest = require('./routers/Interest/updateInterestrouter');
const getinterest = require('./routers/Interest/getInterestrouter');
const interest = require('./routers/Interest/userInterestrouter');
const pushinterest = require('./routers/Interest/pushInterestidinuserrouter');

//Explore

//Notifications get
const getPersonalNotifications = require('./routers/Notification/personalNotificationRouter')
const getconnectionNotifications = require('./routers/Notification/getConnectionNotificationRouter')
const sendAdminNotification = require('./routers/Notification/sendAdminNotificationRouter')

//Hotels
const hoteldata = require('./routers/Hotels/postHoteldatarouter');
const gethotel = require('./routers/Hotels/getHotelsrouter');
const updateid = require('./routers/Hotels/patchHotelsrouter');
const hotelownerinfo = require('./routers/Hotels/updateHotelownerinforouter')
const hotelinfo = require('./routers/Hotels/getHotelownerinforouter')
const gethotelinfo = require('./routers/Hotels/getHotelownerInfoUsinguseridrouter')
const hotelname = require('./routers/Hotels/hotelNamerouter')
const gethotelname = require('./routers/Hotels/getHotelnamerouter')
const gethotelbyid = require('./routers/Hotels/getHotelByowneridrouter')
const getpostmedia = require("./routers/Hotels/getHotelownerpostmediarouter")
const gethotedatabyuserid = require('./routers/Hotels/getHoteldataByuseridrouter')
const pathhoteldata = require('./routers/Hotels/patchHoteldatarouter')
const hotelvialocationPost = require('./routers/Hotels/getHotelsWhilePostingRouter')
const hotelviaHotelId = require('./routers/Hotels/getHotelbyHotelid')
const hotelownercount = require('./routers/Hotels/getHotelOwnerCountRouter')


//vendors

const newvendorservice = require('./routers/vendors/addVendorservicesrouter')
const vendorpost = require('./routers/vendors/vendorServicesrouter')
const vendorinfo = require('./routers/vendors/updateVendorinforouter')
const vendor = require('./routers/vendors/getVendorinforouter')
const getservicenamebyvendorid = require('./routers/vendors/getServicenamebyvendoridrouter')

//service
const service = require('./routers/services/postServicerouter')
const patchserviceId = require('./routers/services/pushServiceidrouter')
const updateServicePrice = require('./routers/services/updatePriceRouter')
const getservicenamebyuser = require('./routers/services/getServicenamebyuseridRouter')
const deleteservice = require('./routers/services/deleteServicesbyvendorserviceidrouter')
const servicename = require('./routers/services/servicesNamerouter')
const getservicename = require('./routers/services/getServicenamerouter')
//location
const location = require('./routers/location/getLocationrouter');
const countries = require('./routers/location/getAllcountryrouter');
const state = require('./routers/location/getAllstatesrouter');
const cities = require('./routers/location/getAllcitiesrouter');
const fetchcoutries = require('./routers/location/fetchAllCountryRouter');


//Report
const postReport = require('./routers/Report/postReportRouter')
const getAllReports = require('./routers/Report/getAllReportsRouter')
const getReportbyRId = require('./routers/Report/getReportbyReportid')

//job
const postjob = require('./routers/Job/postJobrouter');
const getjob = require('./routers/Job/getJobrouter');
const updatejob = require('./routers/Job/patchJobrouter');
const requestjob = require('./routers/Job/requestJobrouter')
const getrequestjob = require('./routers/Job/getRequestedJob')
const getjobbyid = require('./routers/Job/getjobByidrouter')
const department = require('./routers/Job/departmentrouter')
const updatedepartment = require('./routers/Job/updateDepartmentrouter')
const fetcdepartment = require('./routers/Job/fetchDepartmentrouter')
const patchReqJob = require('./routers/Job/patchrequestedJob')
const designaion = require('./routers/Job/addDesignation')
const patchDesignation = require('./routers/Job/patchDesignation')
const jobApplication = require('./routers/Job/applyJobrouter')
const getjobApplicationStage = require('./routers/Job/getAppstagerouter')
const getdesignaion = require('./routers/Job/getDesignationrouter')
const pushjobid = require('./routers/Job/pushJobIdrouter')
const getjobapplication = require('./routers/Job/fetchJobApplicationbyUserIdrouter')
const updatejobapplication = require('./routers/Job/updateJobApplicationrouter')
const bookmarkjob = require('./routers/Job/Bookmarkjobrouter')
const getbookmarkjob = require('./routers/User/fetchBookmarkjobrouter')
const fetchjobapplication = require('./routers/Job/fetchJobApplicationbuJobidrouter')
const getApplicant = require('./routers/Job/getJobapplicantrouter')
const getAllrequestJob = require('./routers/Job/getAllrequestJobrouter')
const fetCandidateDetails = require('./routers/Job/candidateDetailsGetRouter');
const getspecificjobid = require('./routers/Job/getthespecificjobbyidrouter')
const fetchjobbyuserid = require('./routers/Job/getJobbyuseridrouter');
const peopleGetinJob = require('./routers/Job/getPeopleInJobDetailsRouter')

// const fetchjobbyuserid = require('./routers/Job/getJobbyuseridrouter')
const getrequestjobofuser = require('./routers/Job/getRequesteJobbyUseridrouter')
//Jobtitle
const jobtitle = require('./routers/Jobtitle/jobTitlerouter');
const getjobtitle = require('./routers/Jobtitle/getJobtitlerouter');
const findjobowner = require('./routers/Job/findJobownerbyjidroutr')
const getbookmarkjobbyid = require('./routers/Job/fetchBookmarkByuseridrouter')
const deletetitle = require('./routers/Jobtitle/deleteJobTitleRouter')
//App
const appUpdates = require('./routers/App/postappUpdates');
const getappUpdates = require('./routers/App/getAppUpdates');
const updateapps = require('./routers/App/updateApprouter')

// vendorreviews
const addreviews = require('./routers/Reviews/postReviewsrouter')
const userreviews = require('./routers/Reviews/patchReviewsRouter')
const updatereviews = require('./routers/Reviews/updatePostReviewRouter')
const getreviews = require('./routers/Reviews/getReviewByVendorUseridRouter')
const topthreereviews = require('./routers/Reviews/fetchTopThreeReviewByVendorUseridRouter')
const getquickreviews = require('./routers/Reviews/getQuickReviewRouter')

//hotelreview
const posthotelreview = require('./routers/Reviews/HotelPostreviewrouter')
const addhotelreview = require('./routers/Reviews/HotelreviewsOfUserrouter')
const updatehotelreview = require('./routers/Reviews/HotelreviewUpdaterouter')
const gethotelreview = require('./routers/Reviews/getHotelReviewByHotelidRouter')
const fetchtophotelreview = require('./routers/Reviews/findMaxreviewsrouter')
const gethotelquickreview = require('./routers/Reviews/getHotelQuickReviewRouter')

//FAQ
const postfaq =require('./routers/FAQ/faqPostRouter')
const getfaq =require('./routers/FAQ/getFaqRouter')
const updatefaq =require('./routers/FAQ/updateFaqRouter')

app.use(express.static(path.join(__dirname, '/client/retvens-admin-panel/build')))

//spottedbug
const bug =require('./routers/spottedBug/spottedBugPostRouter')
const fetchbug =require('./routers/spottedBug/fetchSpottedBugRouter')

//blocked
const blocked =require('./routers/User/blockUserRouter')

app.use(express.json());



//
app.use(blocked)


//Mesibo api
app.use(notify)
app.use(usercreation)
app.use(users)
app.use(groupusers)
app.use(creategroup)
app.use(member)
app.use(chat)
app.use(call)
app.use(deletegroup)
app.use(leavegroup)

//Admin api
app.use(admin)
app.use(postadmin)
app.use(updateadmin)
app.use(getAdminPosts)

//Notyfications
app.use(getPersonalNotifications)
app.use(getconnectionNotifications)
app.use(sendAdminNotification)

//verification
app.use(uploadDocs)
app.use(getdocument)
app.use(checkVerification)
app.use(rejectApplication)

//Explore


//User
app.use(getprofile)
app.use(updateprofile)
app.use(getuser)
app.use(userprofile)
app.use(contacts)
app.use(save)
app.use(likepost)
app.use(deactivateAcc)
app.use(getcontact)
app.use(getPendingRequest)
app.use(sendRequest)
app.use(verifyUser)
app.use(addUsergroup)
app.use(getusergroup)
app.use(addNewuser)
app.use(getsync)
app.use(hotelownerinfo)
app.use(fetchProfileStatus)
app.use(getNormalUserProfile)
app.use(profileCount)
app.use(delConn)
app.use(multiple)
app.use(checkSynched)
app.use(allUserPolls)
app.use(postIds)
app.use(fetchusername)
app.use(updatejobapplication)
app.use(allRequests)
app.use(getapioffeed)
app.use(datarequest)
app.use(getconnection)
app.use(addresume)
app.use(getsaveallid)
app.use(deleteacco)
app.use(shareprofile)
app.use(deletedata)
app.use(unblock)
app.use(blockuserlist)
app.use(updatehotelinfo)
app.use(postcount)

//saveid
app.use(savedBlogs)
app.use(saveallid)
app.use(savepost)
app.use(savejob)
app.use(saveevent)
app.use(saveservice)
app.use(savehotel)

//Report
app.use(postReport)
app.use(getAllReports)
app.use(getReportbyRId)

//community
app.use(addUsergroup)
app.use(getusergroup)
app.use(addNewuser)
app.use(updategrp)
app.use(Addadmin)
app.use(getgroupbygroupid)
app.use(getgroupbycreatorid)
app.use(fetchgroup)
app.use(fetchcommunity)
app.use(removemember)

//hotels
app.use(hoteldata)
app.use(gethotel)
app.use(updateid)
app.use(hotelownerinfo)
app.use(hotelinfo)
app.use(gethotelinfo)
app.use(hotelname)
app.use(gethotelname)
app.use(gethotelbyid)
app.use(getpostmedia)
app.use(gethotedatabyuserid)
app.use(pathhoteldata)
app.use(hotelvialocationPost)
app.use(hotelviaHotelId)
app.use(hotelownercount)

//vendor

app.use(newvendorservice)
app.use(vendorpost)
app.use(vendorinfo)
app.use(vendor)

app.use(getservicenamebyvendorid)

//service
app.use(service)
app.use(patchserviceId)
app.use(updateServicePrice)
app.use(getservicenamebyuser)
app.use(deleteservice)
app.use(servicename)
app.use(getservicename)

//location
app.use(location)
app.use(countries)
app.use(state)
app.use(cities)
app.use(fetchcoutries)


//Blog
app.use(postblog)
app.use(getblog)
app.use(likeblog)
app.use(commentblog)
app.use(getcommentblog)
app.use(replaycommentblog)
app.use(blogcategory)
app.use(getblogcategory)
app.use(getcategory)
app.use(getblogbyuser)
app.use(getlike)
app.use(getblogbyblogid)
app.use(fetchblog)
app.use(Fetchblog)
app.use(updateblogdata)
app.use(blogCatDel)

//Event
app.use(eventcategory)
app.use(geteventcategory)
app.use(updateeventcategory)
app.use(postevent)
app.use(updateevent)
app.use(geteventbyuserid)
app.use(geteventbyeventid)
app.use(eventWhilePosting)
app.use(ongoingevent)
app.use(geteventcategorybyid)
app.use(allevent)


//job
app.use(postjob)
app.use(getjob)
app.use(updatejob)
app.use(requestjob)
app.use(getrequestjob)
app.use(patchReqJob)
app.use(jobApplication)
app.use(designaion)
app.use(patchDesignation)
app.use(getjobApplicationStage)
app.use(getjobbyid)
app.use(department)
app.use(fetcdepartment)
app.use(getdesignaion)
app.use(updatedepartment)
app.use(pushjobid)
app.use(getjobapplication)
app.use(bookmarkjob)
app.use(getbookmarkjob)
app.use(fetchjobapplication)
app.use(getApplicant)
app.use(getAllrequestJob)
app.use(fetCandidateDetails)
app.use(fetchjobbyuserid)
app.use(peopleGetinJob)

app.use(getrequestjobofuser)
//jobtitle
app.use(jobtitle)
app.use(getjobtitle)
app.use(getspecificjobid)
app.use(deletetitle)

//interest
app.use(updateinterest)
app.use(getinterest)
app.use(interest)
app.use(pushinterest)

//company
app.use(company)
app.use(getcompany)
app.use(updateComp)
app.use(deletecompany)

//Feed


//App
app.use(appUpdates)
app.use(getappUpdates);
app.use(updateapps)

//vendorreviews
app.use(addreviews)
app.use(userreviews)
app.use(updatereviews)
app.use(getreviews)
app.use(topthreereviews)
app.use(getquickreviews)
//hotelsreview
app.use(posthotelreview)
app.use(addhotelreview)
app.use(updatehotelreview)
app.use(gethotelreview)
app.use(fetchtophotelreview)
app.use(gethotelquickreview)

//FAQ
app.use(postfaq)
app.use(getfaq)
app.use(updatefaq)

//spottedbug
app.use(bug)
app.use(fetchbug)

app.get('/', (req, res) => {
    res.send('Congrats you have reached backend sevices.')
    res.sendStatus(200)
  })

const PORT = 8000;
app.listen(PORT,() =>{
    console.log(`connnection is setup at ${PORT}`);
 });
