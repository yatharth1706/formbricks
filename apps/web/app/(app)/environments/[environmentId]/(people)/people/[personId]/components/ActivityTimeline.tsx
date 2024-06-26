import { TAction } from "@formbricks/types/actions";
import { TEnvironment } from "@formbricks/types/environment";
import { EmptySpaceFiller } from "@formbricks/ui/EmptySpaceFiller";
import { UpgradePlanNotice } from "@formbricks/ui/UpgradePlanNotice";

import { ActivityItemContent, ActivityItemIcon, ActivityItemPopover } from "./ActivityItemComponents";

interface IActivityTimelineProps {
  environment: TEnvironment;
  actions: TAction[];
  isUserTargetingEnabled: boolean;
}

export const ActivityTimeline = ({
  environment,
  actions,
  isUserTargetingEnabled,
}: IActivityTimelineProps) => {
  return (
    <>
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-lg font-bold text-slate-700">Actions Timeline</h2>
      </div>

      {!isUserTargetingEnabled ? (
        <UpgradePlanNotice
          message="Upgrade to the User Targeting plan to store action history."
          textForUrl="Upgrade now."
          url={`/environments/${environment.id}/settings/billing`}
        />
      ) : (
        <div className="relative">
          {actions.length === 0 ? (
            <EmptySpaceFiller type={"event"} environment={environment} />
          ) : (
            <div>
              {actions.map(
                (actionItem, index) =>
                  actionItem && (
                    <li key={actionItem.id} className="list-none">
                      <div className="relative pb-12">
                        {index !== actions.length - 1 && (
                          <span
                            className="absolute left-6 top-4 -ml-px h-full w-0.5 bg-slate-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative">
                          <ActivityItemPopover actionItem={actionItem}>
                            <div className="flex space-x-3 text-left">
                              <ActivityItemIcon actionItem={actionItem} />
                              <ActivityItemContent actionItem={actionItem} />
                            </div>
                          </ActivityItemPopover>
                        </div>
                      </div>
                    </li>
                  )
              )}
              <div className="relative">
                {actions.length === 10 && (
                  <div className="absolute bottom-0 flex h-56 w-full items-end justify-center bg-gradient-to-t from-slate-50 to-transparent"></div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
