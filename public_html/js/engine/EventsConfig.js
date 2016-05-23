'use strict';

define([], function () {
    return {
        Game: {
            AbstractPlayer: {
                Act: "AbstractPlayer::Act",
                InfoCardInOwnContainer: "AbstractPlayer::InfoCardInOwnContainer",
                MustCreateInfoCard: "AbstractPlayer::MustCreateInfoCard",
                InfoCardBackToDeck: "AbstractPlayer::InfoCardBackToDeck",
                GraphicsVisibleAndEventsOnForContainer: "AbstractPlayer::GraphicsVisibleAndEventsOnForContainer",
                RemoveGapsInDeck: "AbstractPlayer::RemoveGapsInDeck",
                DeleteCardFromCardCollection: "AbstractPlayer::DeleteCardFromCardCollection",
                AddInfoCardToBattlesContainer: "AbstractPlayer::AddInfoCardToBattlesContainer",
                ShowBattlesInfoCard: "AbstractPlayer::ShowBattlesInfoCard",
                BattlesInfoCardCreated: "AbstractPlayer::BattlesInfoCardCreated",
                InfoCardInContainer: "AbstractPlayer::InfoCardInContainer",
                InfoCardAddedToBattle: "AbstractPlayer::InfoCardAddedToBattle",
                PreviousInfoCardInDeck: "AbstractPlayer::PreviousInfoCardInDeck"

            },
            Player: {
                PlayerAct: "Player::PlayerAct"
            },
            CardModel: {
                CleanClickEventCard: "CardModel::CleanClickEventCard"
            },
            InfoCardModel: {
                ShowInfoCard: "InfoCardModel::ShowInfoCard",
                BackToDeck: "InfoCardModel::BackToDeck",
                AddToBattlesContainer: "InfoCardModel::AddToBattlesContainer"
            },
            PlayersCardsDeck: {
                RemoveGapsInDeck: "PlayersCardsDeck::RemoveGapsInDeck",
                DeleteCardFromCardCollection: "PlayersCardsDeck::DeleteCardFromCardCollection",
                CreatePlayersDeck: "PlayersCardsDeck::CreatePlayersDeck"
            },
            AbstractCardModel: {
                ChangeClickListener: "AbstractCardModel::ChangeClickListener",
                CreateBattlesInfoCard: "AbstractCardModel::CreateBattlesInfoCard"
            },
            AbstractCardContainerModel: {
                GraphicsVisible: "AbstractCardContainerModel::GraphicsVisible",
                SetGraphicsListener: "AbstractCardContainerModel::SetGraphicsListener",
                CleanClickListener: "AbstractCardContainerModel::CleanClickListener",
                SetClickListener: "AbstractCardContainerModel::SetClickListener",
                SetPositionInContainer: "AbstractCardContainerModel::SetPositionInContainer",
                SetCardToCardCollection: "AbstractCardContainerModel::SetCardToCardCollection"
            }
        },
        Backbone: {},
        Messenger: {}
    };
});
