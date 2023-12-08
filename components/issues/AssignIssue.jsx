"use client";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import { customFetch } from "@/lib/utils/api-call";
import { useParams, useRouter } from "next/navigation";
import CustomButton from "../Custom/CustomButton";
import { useState } from "react";
import { actions, issueStates } from "@/lib/utils/tabs";
import { useSession } from "next-auth/react";

const AssignIssue = ({ users = [], active = null, status }) => {
  const { teamId, issueId } = useParams();
  const [loading, setLoading] = useState({ unsolved: false, solved: false });
  const router = useRouter();
  const handleClick = async (id) => {
    let body = { _id: id, owner: true };
    const response = await customFetch(
      `/teams/${teamId}/issue/${issueId}`,
      "PATCH",
      body
    );
    if (response.status == 200) {
      router.refresh();
    } else {
      alert(response.data.msg);
    }
  };

  const handleAction = async (action) => {
    setLoading((prev) => ({ ...prev, [action]: true }));
    const response = await customFetch(
      `/teams/${teamId}/issue/${issueId}/${action}`,
      "PATCH"
    );
    if (response.status === 200) {
      setLoading((prev) => ({ ...prev, [action]: false }));
      router.refresh();
    }
  };

  const renderAssignedMember = () => (
    <>
      <small className="text-center">
        {status === issueStates.CLOSED || status === issueStates.REVIEW
          ? "solved by"
          : "assigned to"}
      </small>
      <CustomButton variant="outline" className="border">
        <Image
          alt="user"
          src={active.image}
          width={25}
          height={25}
          className="rounded-circle me-1"
        />
        <small>{active.name}</small>
      </CustomButton>
    </>
  );

  const renderDropDown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="white" className="w-100 border px-2">
          {!active ? (
            "Unassigned"
          ) : (
            <>
              <Image
                alt="user"
                src={active.image}
                width={25}
                height={25}
                className="rounded-circle me-1"
              />
              <span>{active.name}</span>
            </>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow-lg">
          <Dropdown.Item active={!active}>Unassigned</Dropdown.Item>
          {users.map((user, index) => (
            <Dropdown.Item
              key={index}
              active={user._id == active?._id}
              onClick={() => handleClick(user._id)}
            >
              <>
                <Image
                  alt="user"
                  src={user.image}
                  width={25}
                  height={25}
                  className="rounded-circle me-1"
                />
                <span>{user.name}</span>
              </>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const renderReviewIssue = () => {
    return (
      <>
        {renderAssignedMember()}
        <CustomButton
          variant="danger"
          loading={loading.unsolved}
          onClick={() => handleAction(actions.UNSOLVED)}
        >
          Mark as Unsolved
        </CustomButton>
        <CustomButton
          variant="success"
          loading={loading.solved}
          onClick={() => handleAction(actions.SOLVED)}
        >
          Verified and Closed
        </CustomButton>
      </>
    );
  };
  if (status != issueStates.CLOSED && status != issueStates.REVIEW) {
    return renderDropDown();
  }

  switch (status) {
    case issueStates.REVIEW:
      return renderReviewIssue();
    case issueStates.CLOSED:
      return renderAssignedMember();
    default:
      return null;
  }
};

export default AssignIssue;

export const AssignByTeamMember = ({
  active = null,
  you = null,
  status = "",
}) => {
  const { data } = useSession();
  const { teamId, issueId } = useParams();
  const router = useRouter();
  const url = `/teams/${teamId}/issue/${issueId}`;
  const [loading, setLoading] = useState({
    assign: false,
    withdraw: false,
    review: false,
  });

  const handleAction = async (action) => {
    setLoading((prev) => ({ ...prev, [action]: true }));
    const response = await customFetch(
      `/teams/${teamId}/issue/${issueId}/${action}`,
      "PATCH"
    );
    if (response.status === 200) {
      setLoading((prev) => ({ ...prev, [action]: false }));
      router.refresh();
    }
  };

  const assignToMyself = async () => {
    setLoading((prev) => ({ ...prev, assign: true }));
    const response = await customFetch(url, "PATCH", { _id: you._id });
    if (response.status == 200) {
      setLoading((prev) => ({ ...prev, assign: false }));
      router.refresh();
    }
  };
  if (
    (active && active?.email !== you?.email) ||
    status === issueStates.CLOSED
  ) {
    return (
      <>
        <small className="text-center">
          {status === issueStates.CLOSED || status === issueStates.REVIEW
            ? "solved by"
            : "assigned to"}
        </small>
        <CustomButton variant="outline" className="border">
          <Image
            alt="user"
            src={active.image}
            width={25}
            height={25}
            className="rounded-circle me-1"
          />
          <small>{active.name}</small>
        </CustomButton>
      </>
    );
  } else if (!you) {
    return null;
  } else if (status == issueStates.REVIEW) {
    return (
      <div>
        <small>
          NOTE:This issue review by admin will provide updates on the issue
          through email. Please keep an eye on your inbox for further
          information.
        </small>
      </div>
    );
  } else if (active?.email == you?.email) {
    return (
      <>
        <CustomButton
          variant="danger"
          loading={loading.withdraw}
          onClick={() => handleAction(actions.WITHDRAW)}
        >
          Withdraw
        </CustomButton>
        <CustomButton
          variant="success"
          loading={loading.review}
          onClick={() => handleAction(actions.REVIEW)}
        >
          Solved & Done
        </CustomButton>
      </>
    );
  }

  return (
    <CustomButton
      variant="outline"
      className="border"
      loading={loading.assign}
      onClick={assignToMyself}
    >
      Assign to Myself
    </CustomButton>
  );
};
