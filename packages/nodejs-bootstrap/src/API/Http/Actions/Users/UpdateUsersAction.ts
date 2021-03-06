import {Request, Response} from "express";
import {success} from "../../../../utils/customResponse";
import UpdateUserAdapter from "../../Adapters/Users/UpdateUserAdapter";
import UpdateUserHandler from "../../../../Application/Handlers/Users/UpdateUserHandler";
import UpdateUserPresenter from "../../Presenters/Users/UpdateUserPresenter";
import {injectable} from "inversify";
import {HTTP_CODES} from "../../Enums/HttpStatuses";

@injectable()
export default class UpdateUsersAction {
  private adapter: UpdateUserAdapter;
  private handler: UpdateUserHandler;

  constructor(
    adapter: UpdateUserAdapter,
    handler: UpdateUserHandler
  ) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateUserPresenter(result);

    return response.status(HTTP_CODES.OK).json(
      success(presenter.getData(), 'UpdateUsersAction: User has been updated')
    );
  }
}
