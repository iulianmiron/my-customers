(function() {
	'use strict';

	angular
		.module('cm.components.test', [])
		.component('test', {
			templateUrl: 'components/test/test.html',
			controller: testController,
			bindings: {}
		});

		testController.$inject = ['$timeout', 'ClientsDataService', 'socketService'];
		function testController($timeout, ClientsDataService, socketService) {
			var ctrl = this;
			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};

			ctrl.$onInit = function() {
				ctrl.data.csvHeaders = 'Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Group Membership,E-mail 1 - Type,E-mail 1 - Value,E-mail 2 - Type,E-mail 2 - Value,Phone 1 - Type,Phone 1 - Value,Phone 2 - Type,Phone 2 - Value,Address 1 - Type,Address 1 - Formatted,Address 1 - Street,Address 1 - City,Address 1 - PO Box,Address 1 - Region,Address 1 - Postal Code,Address 1 - Country,Address 1 - Extended Address,Organization 1 - Type,Organization 1 - Name,Organization 1 - Yomi Name,Organization 1 - Title,Organization 1 - Department,Organization 1 - Symbol,Organization 1 - Location,Organization 1 - Job Description,Relation 1 - Type,Relation 1 - Value,Website 1 - Type,Website 1 - Value'.split(',');

				ctrl.data.messageList = [];

				ctrl.status.showJoin = true;

				ctrl.actions.joinChat = joinChat;
				ctrl.actions.leaveChat = leaveChat;
				ctrl.actions.sendMessage = sendMessage;
				ctrl.actions.sendIsTyping = sendIsTyping;
				

				// getAllClients();
			}

			function joinChat(username) {
				socketService.emit('c:join', username);
			}
			socketService.on('s:user-joined', function(user) {
				var message = {
					username: 'Server',
					msg: user + ' has joined chat'
				}
				ctrl.status.showJoin = false;
				ctrl.data.username = null;
				ctrl.data.messageList.push(message);
			});

			function leaveChat() {
				socketService.emit('c:disconnect');
				ctrl.status.showJoin = true;
			}
			socketService.on('s:user-left', function(user) {
				var message = {
					username: 'Server',
					msg: user + ' has left chat'
				}
				ctrl.data.messageList.push(message);
			});

			socketService.on('s:users-list', function(usersInChat) {
				ctrl.data.usersInChat = usersInChat;
			});

			function sendMessage(msg) {
				socketService.emit('c:message', msg);

				ctrl.data.message = null;
			}

			socketService.on('s:message', function(msg) {
				ctrl.data.messageList.push(msg);
			});

			function sendIsTyping() {
				socketService.emit('c:user-is-typing');
			} 

			socketService.on('s:user-is-typing', function(user) {
				ctrl.data.typingUser = user;
				$timeout(function() {
					ctrl.data.typingUser = null;
				}, 2000);
				
			});

			socketService.on('s:error', function(msg) {
				ctrl.data.error = msg;
				$timeout(function(){
					ctrl.data.error = null;
				}, 5000);
			})

			function getAllClients() {
				ClientsDataService.getAll().then(function(rClients) {
					ctrl.data.allClients = formatToGoogleContactsCSV(rClients);
				});
			}

			function formatToGoogleContactsCSV(clients) {
				return clients.map(function(client) {
					return {
						'Name': client.firstName.charAt(0).toUpperCase() + client.firstName.slice(1) + ' ' + client.lastName.charAt(0).toUpperCase() + client.lastName.slice(1),
						'Given Name': client.firstName.charAt(0).toUpperCase() + client.firstName.slice(1),
						'Additional Name': '',
						'Family Name': client.lastName.charAt(0).toUpperCase() + client.lastName.slice(1),
						'Yomi Name': '',
						'Given Name Yomi': '',
						'Additional Name Yomi': '',
						'Family Name Yomi': '',
						'Name Prefix': '',
						'Name Suffix': '',
						'Initials': '',
						'Nickname': '',
						'Short Name': '',
						'Maiden Name': '',
						'Birthday': moment(client.dateOfBirth).add(3, 'hours').format('DD-MM-YYYY'),
						'Gender': '',
						'Location': '',
						'Billing Information': '',
						'Directory Server': '',
						'Mileage': '',
						'Occupation': '',
						'Hobby': '',
						'Sensitivity': '',
						'Priority': '',
						'Subject': '',
						'Notes': '',
						'Group Membership': '* My Contacts ::: Cliente',
						'E-mail 1 - Type': '',
						'E-mail 1 - Value': client.email,
						'E-mail 2 - Type': '',
						'E-mail 2 - Value': '',
						'Phone 1 - Type': "Mobile",
						'Phone 1 - Value': client.phoneNumber,
						'Phone 2 - Type': '',
						'Phone 2 - Value': '',
						'Address 1 - Type': '',
						'Address 1 - Formatted': '',
						'Address 1 - Street': '',
						'Address 1 - City': '',
						'Address 1 - PO Box': '',
						'Address 1 - Region': '',
						'Address 1 - Postal Code': '',
						'Address 1 - Country': '',
						'Address 1 - Extended Address': '',
						'Organization 1 - Type': '',
						'Organization 1 - Name': '',
						'Organization 1 - Yomi Name': '',
						'Organization 1 - Title': '',
						'Organization 1 - Department': '',
						'Organization 1 - Symbol': '',
						'Organization 1 - Location': '',
						'Organization 1 - Job Description': '',
						'Relation 1 - Type': '',
						'Relation 1 - Value': '',
						'Website 1 - Type': '',
						'Website 1 - Value': ''
					}
				})
			}

		}
})();