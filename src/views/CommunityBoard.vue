<template>
  <div class="community-board">
    <h1>Community Board</h1>

    <div v-if="postCount !== null" class="post-count">
      <h3>Total Posts: {{ postCount }}</h3>
    </div>

    <div class="input-form">
      <h3>Create New Post</h3>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" v-model="newPost.title" id="title" required />
        </div>
        <div class="form-group">
          <label for="cc">CC (Email):</label>
          <input type="email" v-model="newPost.cc" id="cc" />
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea v-model="newPost.content" id="content" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" @click="exportCSV" class="btn btn-secondary">Export CSV</button>
      </form>
    </div>

    <div class="table-container">
      <h3>Posts</h3>
      <table id="postTable" class="display"></table>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase/init";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import axios from 'axios';

export default {
  data() {
    return {
      newPost: {
        title: "",
        cc: "",
        content: ""
      },
      posts: [],
      postCount: null
    };
  },
  methods: {
    async submitPost() {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          alert("No username found in localStorage. Please log in first.");
          return;
        }

        const postData = {
          ...this.newPost,
          username: username
        };

        await addDoc(collection(db, "posts"), postData);

        if (this.newPost.cc) {
          await this.sendEmail(this.newPost.cc, this.newPost.title, this.newPost.content);
        }

        this.fetchPosts();
        this.fetchPostCount();
        this.resetForm();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async sendEmail(ccEmail, title, content) {
      try {
        const response = await axios.post('http://localhost:3001/send-email', {
          email: ccEmail,
          subject: `CC: ${title}`,
          message: content
        });

        if (response.status === 202) {
          alert('Email has been sent!');
        } else {
          alert('Failed to send email.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Network error. Failed to send email.');
      }
    },

    async fetchPosts() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      this.posts = querySnapshot.docs.map((doc) => doc.data());
      this.loadDataTable();
    },

    loadDataTable() {
      $(document).ready(() => {
        $("#postTable").DataTable({
          data: this.posts,
          columns: [
            { title: "Username", data: "username" },
            { title: "Title", data: "title" },
            { title: "Content", data: "content" }
          ],
          pageLength: 10,
          destroy: true
        });
      });
    },

    exportCSV() {
      const csvContent = this.posts.map(post => `${post.username},${post.title},${post.content}`).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "community_board_posts.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    async fetchPostCount() {
      try {
        const response = await axios.get("https://countposts-zqrclusmla-uc.a.run.app");
        this.postCount = response.data.count;
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    }
  },
  mounted() {
    this.fetchPosts();
    this.fetchPostCount();
  }
};
</script>

<style scoped>
.community-board {
  padding: 20px;
}

.input-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.table-container {
  margin-top: 20px;
}

.post-count {
  margin-bottom: 20px;
}
</style>
