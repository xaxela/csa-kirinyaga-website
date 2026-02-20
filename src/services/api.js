const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  async fetchTableData(tableName) {
    try {
      const response = await fetch(`${API_BASE_URL}/${tableName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }
  }

  async createRecord(tableName, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw error;
    }
  }

  async deleteRecord(tableName, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${tableName}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw error;
    }
  }

  // Specific methods for different tables
  async getMembers() {
    return this.fetchTableData('members');
  }

  async getEvents() {
    return this.fetchTableData('events');
  }

  async getContributions() {
    return this.fetchTableData('contributions');
  }

  async getRoles() {
    return this.fetchTableData('roles');
  }

  async getSubGroups() {
    return this.fetchTableData('sub_groups');
  }

  async getMemberRoles() {
    return this.fetchTableData('member_roles');
  }

  async getEventAttendance() {
    return this.fetchTableData('event_subgroup_attendance');
  }

  // Create methods
  async createMember(memberData) {
    return this.createRecord('members', memberData);
  }

  async createEvent(eventData) {
    return this.createRecord('events', eventData);
  }

  async createContribution(contributionData) {
    return this.createRecord('contributions', contributionData);
  }

  // Delete methods
  async deleteMember(memberId) {
    return this.deleteRecord('members', memberId);
  }

  async deleteEvent(eventId) {
    return this.deleteRecord('events', eventId);
  }

  async deleteContribution(contributionId) {
    return this.deleteRecord('contributions', contributionId);
  }
}

export default new ApiService();
