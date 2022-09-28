import axios from "axios";
import GitProfile from "./GitProfile";
const { render, screen, fireEvent, waitFor } = require("@testing-library/react");

jest.mock("axios");

describe('Rendering of GitProfile', () => { 
  it("should display the message No data found initially", () => {
    render(<GitProfile/>);

    expect(screen.getByText("No data found")).toBeInTheDocument()
  });

  it("should contain fetch data button", () => {
    render(<GitProfile />);

    expect(screen.getByRole("button", { name: "Fetch data" })).toBeInTheDocument();
  });
 })

 describe("Functionality test", () => {
  it("should call axios when fetch data button is clicked", () => {
		/* axios.get.mockResolvedValue({
			data: {
				login: "User",
				id: 1234,
			},
		}); */
		render(<GitProfile url={"mock/git"} />);

		fireEvent.click(screen.getByRole("button", { name: "Fetch data" }));

		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith("mock/git");
	});

  it('should render git profile data when fetch data button is clicked', async () => { 
    axios.get.mockResolvedValue({
			data: {
				login: "User",
				id: 1234,
			},
		});
    render(<GitProfile url={"mock/git"} />);

    fireEvent.click(screen.getByRole("button", { name: "Fetch data" }));

    await screen.findByText("Data");
    expect(screen.queryByText("No data found")).not.toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
   })
 });