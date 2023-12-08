"use client";
import { Container, Alert, Button } from "react-bootstrap";
import CustomButton from "../Custom/CustomButton";
import { customFetch } from "@/lib/utils/api-call";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Join = ({ team = null }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(team === null);
  const handleJoin = async () => {
    setLoading(true);
    const response = await customFetch(`/teams/${team._id}/join`, "PATCH");
    setLoading(false);
    if (response.status == 200) {
      router.push("/joined-teams");
    } else {
      setError(true);
    }
  };
  return (
    <Container className="empty text-center">
      <div>
        <h2>{team?.title} </h2>
        <p>{team?.description}</p>
        {error ? (
          <Alert variant="danger">
            <Alert.Heading>Something Went Wrong!</Alert.Heading>
            <p>
              You haven&#39;t been invited to join this Team. Please wait for an
              official invitation from the team administrator.
            </p>
            <hr />
            <Link href="/joined-teams">
              <Button variant="">Go to Join Teams</Button>
            </Link>
          </Alert>
        ) : (
          <CustomButton
            bg={team?.bg}
            onClick={handleJoin}
            loading={loading}
            className="mt-2"
          >
            Join
          </CustomButton>
        )}
      </div>
    </Container>
  );
};

export default Join;
