import { Controller } from "stimulus";
import places from "places.js";

export default class extends Controller {
  static targets = ["addressInput"];

  connect() {
    places({ container: this.addressInputTarget });
  }
}
