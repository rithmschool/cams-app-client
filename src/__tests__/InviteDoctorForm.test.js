import InviteDoctorForm from "../InviteDoctorForm";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";

test("matches snapshot of InviteDoctorForm", () => {
  const inviteDoctorForm = renderer.create(<InviteDoctorForm />).toJSON();
  expect(inviteDoctorForm).toMatchSnapshot();
});

test("should pass a selected value to the onSubmit handler", () => {
  const spy = jest.spyOn(InviteDoctorForm.prototype, "handleSubmit");
  const wrapper = shallow(<InviteDoctorForm />);
  wrapper.find("form").simulate("submit", { preventDefault() {} });
  expect(spy).toHaveBeenCalled();
});

it("responds to a change", () => {
  const spy = jest.spyOn(InviteDoctorForm.prototype, "handleChange");
  const wrapper = shallow(<InviteDoctorForm />);
  wrapper.find('input[type="email"]').simulate("change", {
    target: {
      name: "email",
      value: "s"
    }
  });
  expect(spy).toHaveBeenCalled();
});
