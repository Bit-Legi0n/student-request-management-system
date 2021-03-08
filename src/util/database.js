import User from "../models/user";
import RequestModel from "../models/request";
import Reply from "../models/reply";

// Database functionality

const queryPromise = (pool, sql, values) =>
  new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });

// getUser
// Get User object given username
const getUser = async (pool, id) => {
  let results;
  try {
    results = await queryPromise(
      pool,
      "SELECT * FROM users WHERE id=?;",
      [id]
    );
  } catch (error) {
    throw "Databse Error";
  }
  
  if (results.length) {
    return new User(
      results[0].id,
      results[0].name,
      results[0].type,
      results[0].password
    );
  }
  return null;
};

// getUsername
// Get username given userId
const getUsername = async (pool, id) => {
  let results;
  try {
    results = await queryPromise(
      pool,
      "SELECT name FROM users WHERE id=?;",
      [id]
    );
  } catch (error) {
    throw "Database Error";
  }

  if (results.length) {
    return results[0].name;
  }
  return null;
};

// getStaff
// Get relevant staff members for new request form

// getRequests
// Get list of requests for a given user
const getRequests = async (pool, studentId) => {
  let results;
  try {
    results = await queryPromise(
      pool,
      "SELECT * FROM requests WHERE student_id=?;",
      [studentId]
    );
  } catch (error) {
    throw "Database Error";
  }
  if (results.length) {
    results.forEach((rec, index, arr) => {
      arr[index] = new RequestModel(
        rec.id,
        rec.student_id,
        rec.staff_id,
        rec.datetime,
        rec.status,
        rec.type,
        rec.body
      );
    });
    return results;
  }
  return null;

};

// saveRequest
// Save request
const saveRequest = async (pool, request) => {
  try {
    await queryPromise(
      pool,
      "INSERT INTO requests (id, student_id, staff_id, datetime, status, type, body) VALUES (?,?,?,?,?,?,?);",
      [Object.values(request)]
    );
  } catch (error) {
    throw "Database Error";
  }
};

// setRequestStatus
// Set the status of the request
const setRequestStatus = async (pool, reqId, status) => {
  try {
    await queryPromise(pool, "UPDATE requests SET status=? WHERE id=?;", [
      status,
      reqId,
    ]);
  } catch (error) {
    throw "Database Error";
  }
};

// getRequest
// Get Request object given requestId
const getRequest = async (pool, id) => {
  let results;
  try {
    results = await queryPromise(
      pool,
      "SELECT * FROM requests WHERE id=?;",
      [id]
    );
  } catch (error) {
    throw "Database Error";
  }

  if (results.length) {
    return new RequestModel(
      results[0].id,
      results[0].student_id,
      results[0].staff_id,
      results[0].datetime,
      results[0].status,
      results[0].type,
      results[0].body
    );
  }
  return null;
};

// getReplies
// Get list of replies given requestId
const getReplies = async (pool, reqId) => {
  let results;
  try {
    results = await queryPromise(
      pool,
      "SELECT * FROM replies WHERE req_id=?;",
      [reqId]
    );
  } catch (error) {
    throw "Database Error";
  }
  if (results.length) {
    results.forEach((rec, index, arr) => {
      arr[index] = new Reply(
        rec.id,
        rec.req_id,
        rec.user_id,
        req.datetime,
        req.body
      );
    });
    return results;
  }
  return null;
};

// saveReply
// Save reply
const saveReply = async (pool, reply) => {
  // Assume you get a normal object
  try {
    await queryPromise(
      pool,
      "INSERT INTO replies (id, req_id, user_id, datetime, body) VALUES (?,?,?,?,?);",
      [Object.values(reply)]
    );
  } catch (error) {
    console.log(error);
  }
};

export {
  getUser,
  getUsername,
  getRequests,
  saveRequest,
  setRequestStatus,
  getRequest,
  getReplies,
  saveReply
};