import { Controller } from "stimulus";
import "slick-carousel";
import $ from "jquery";

export default class extends Controller {
  connect() {
    $(".carousel").slick({
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      variableWidth: true
    });
  }
}
