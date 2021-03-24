import Vue from "vue";
import Element from "element-ui";
import "../assets/styles/element-variables.scss";

Vue.use(Element);

//message共通
Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
};

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
};

Vue.prototype.msgWarning = function(msg) {
  this.$message({ showClose: true, message: msg, type: "warning" });
};

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg);
};
