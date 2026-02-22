import { ProgressBadge } from "@/types";
import { EggFried, Flame, PartyPopper, ThumbsDown, ThumbsUp, Train } from "lucide-react"



/**
 * Returns data for a progress badge based on words written vs expected
 * @param totalWordsWritten 
 * @param wordcountGoal 
 * @param expectedWordcount 
 * @returns ProgressBadge
 */
export function getProgressBadge (
  totalWordsWritten: number,
  wordcountGoal: number,
  expectedWordcount: number
): ProgressBadge {

  const progressBadges = {
    complete: {
        text: 'Goal completed!',
        icon: PartyPopper,
        colour: '#24847c', 
    },
    ahead: {
        text: 'Ahead of the game!',
        icon: ThumbsUp,
        colour: '#032c4d', 
    },
    onTrack: {
        text: 'On track!',
        icon: Train,
        colour: '#004540',
    },
    aBitBehind: {
        text: 'A bit behind',
        icon: ThumbsDown,
        colour: '#7e3110',
    },
    uhOh: {
        text: 'Uh oh',
        icon: Flame,
        colour: '#B91C1C', 
    },
};

const aheadThreshold = 0.10; // 10% above expected
const aBitBehindThreshold = 0.20; // 10% below expected

let selectedBadge;

if (totalWordsWritten >= wordcountGoal) {
    selectedBadge = progressBadges.complete;
} else if (totalWordsWritten >= expectedWordcount * (1 + aheadThreshold)) {
    selectedBadge = progressBadges.ahead;
} else if (totalWordsWritten >= expectedWordcount) {
    selectedBadge = progressBadges.onTrack;
} else if (totalWordsWritten >= expectedWordcount * (1 - aBitBehindThreshold)) {
    selectedBadge = progressBadges.aBitBehind;
} else {
    selectedBadge = progressBadges.uhOh;
}

return selectedBadge;

}