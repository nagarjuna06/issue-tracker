import { Container, Stack, Table } from "react-bootstrap";
import ApiDocument from "../popups/ApiDocument";
import ApiKeyForm from "../popups/ApiKeyForm";
import BugImage from "../empty/BugImage";
import { dateFormat } from "@/lib/utils/timeFormat";
import ConfirmDelete from "../popups/confirmDelete";
import Link from "next/link";
import { isCurrentSearch, setSearchParams } from "@/lib/utils/utils";
import { BsArrowUp } from "react-icons/bs";
import CopyApiKey from "../Custom/CopyApiKey";

const ApiIntegration = ({ bg = "", data = [], searchParams }) => {
  const columns = [
    { label: "Name", value: "title" },
    { label: "Origin", value: "origin" },
    { label: "Creation Date", value: "createdAt" },
  ];
  return (
    <Container fluid>
      <Stack direction="horizontal">
        <ApiDocument />
        <ApiKeyForm bg={bg} />
      </Stack>
      {data.length ? (
        <Table className="mt-3 text-nowrap" responsive>
          <thead>
            <tr>
              {columns.map((each, index) => (
                <th key={index}>
                  <Link
                    href={{
                      query: setSearchParams(searchParams, each.value),
                    }}
                  >
                    {each.label}
                    {isCurrentSearch(searchParams, each.value) && <BsArrowUp />}
                  </Link>
                </th>
              ))}
              <th>Api Key</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.origin}</td>
                <td>{dateFormat(row.createdAt)}</td>
                <td>
                  <CopyApiKey apiKey={row.apiKey} />
                </td>
                <td>
                  <ApiKeyForm
                    type="update"
                    initialValues={{ title: row.title, origin: row.origin }}
                    bg={bg}
                    apiKey={row.apiKey}
                  />
                </td>
                <td>
                  <ConfirmDelete type="api-key" apiKey={row.apiKey} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <BugImage
          caption="You have not created any api keys yet.Start by Creating one"
          height={75}
        />
      )}
    </Container>
  );
};

export default ApiIntegration;
